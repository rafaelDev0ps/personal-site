---
title: "Getting Started with GitOps: Infrastructure as Code, Done Right"
date: "2026-03-20"
tags: ["gitops", "kubernetes", "devops", "automation"]
slug: "getting-started-with-gitops"
excerpt: "GitOps turns your Git repository into the single source of truth for your infrastructure. Here's how to think about it and where to start."
---

After years of running `kubectl apply -f` by hand and wondering why prod looked different from staging, I started taking GitOps seriously. This is the mental model that finally made it click for me.

## What GitOps Actually Is

GitOps is an operating model where **Git is the source of truth for both application and infrastructure state**. You describe the desired state in a repository, and a reconciliation loop continuously ensures the cluster matches that description.

The four principles, as defined by OpenGitOps:

1. **Declarative** — The system is described declaratively
2. **Versioned and immutable** — Desired state is stored in a way that enforces immutability and versioning
3. **Pulled automatically** — Software agents automatically pull the desired state
4. **Continuously reconciled** — Agents continuously observe and attempt to apply the desired state

The key shift from traditional CI/CD: instead of your pipeline *pushing* changes to the cluster, an agent *inside* the cluster pulls changes from Git. Your pipeline's job ends at "update the manifest in Git".

## The Tools

Two tools dominate the GitOps space for Kubernetes:

### Argo CD

Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes. It watches your Git repo and syncs the cluster to match. The UI alone is worth it — seeing exactly what's out-of-sync and why saves hours of debugging.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/you/your-repo
    targetRevision: HEAD
    path: k8s/overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

### Flux CD

Flux takes a more GitOps-native approach — every component is itself a Kubernetes custom resource. It's more composable and fits well in multi-tenant environments.

```yaml
apiVersion: source.toolkit.fluxcd.io/v1
kind: GitRepository
metadata:
  name: my-app
  namespace: flux-system
spec:
  interval: 1m
  url: https://github.com/you/your-repo
  ref:
    branch: main
```

I've used both in production. Argo CD wins on developer experience. Flux wins on flexibility and multi-tenancy. Pick based on your team's needs.

## Repository Structure

One of the first decisions is how to organize your manifests. A pattern I keep coming back to:

```
infrastructure/
├── base/
│   ├── namespaces.yaml
│   └── rbac.yaml
├── clusters/
│   ├── staging/
│   │   └── apps.yaml        # points to overlays/staging
│   └── production/
│       └── apps.yaml        # points to overlays/production
└── apps/
    ├── my-app/
    │   ├── base/
    │   │   ├── deployment.yaml
    │   │   └── service.yaml
    │   └── overlays/
    │       ├── staging/
    │       │   └── kustomization.yaml
    │       └── production/
    │           └── kustomization.yaml
```

Kustomize overlays handle environment-specific configuration (replica counts, resource limits, image tags) without duplicating the base manifests.

## The Image Update Automation Problem

The trickiest part of GitOps is image tag updates. Your app builds a new image — how does the tag get updated in Git?

Two common approaches:

**Option 1: CI writes to Git**
Your CI pipeline (GitHub Actions, etc.) opens a PR or directly commits the new image tag. Simple but means your pipeline needs write access to the infra repo.

**Option 2: Image automation controllers**
Both Argo CD Image Updater and Flux's Image Automation Controller can watch a container registry and automatically commit tag updates to Git. This keeps humans out of the loop for routine deploys.

```yaml
# Flux Image Automation
apiVersion: image.toolkit.fluxcd.io/v1beta2
kind: ImageUpdateAutomation
metadata:
  name: my-app
  namespace: flux-system
spec:
  interval: 30m
  sourceRef:
    kind: GitRepository
    name: my-app
  git:
    commit:
      author:
        name: FluxBot
        email: flux@example.com
      messageTemplate: 'chore: update {{range .Updated.Images}}{{println .}}{{end}}'
  update:
    path: ./apps/my-app/overlays/production
    strategy: Setters
```

## What I Wish I Knew Earlier

**Seal your secrets before they touch Git.** Use Sealed Secrets or SOPS. Never commit plaintext secrets. This is non-negotiable.

**Health checks matter more than you think.** GitOps tools report sync status based on Kubernetes resource conditions. If your `readinessProbe` is misconfigured, the sync will succeed but your app will be broken. Invest in proper health checks up front.

**Drift detection is the superpower.** The moment you have a GitOps agent running, you get continuous drift detection for free. Any manual `kubectl apply` or Helm upgrade outside of Git will be flagged. This is worth the migration effort on its own.

Start small: pick one non-critical service, put its manifests in Git, and point Argo CD or Flux at it. The feedback loop teaches you more than any tutorial.

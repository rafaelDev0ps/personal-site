"use client";

import { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  id: number;
  content: JSX.Element;
  delay?: number;
}

interface Command {
  command: string;
  description: string;
  action: () => void;
}

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = [
    {
      command: 'about',
      description: 'Display information about Rafael',
      action: showAbout
    },
    {
      command: 'articles',
      description: 'View articles and blog posts',
      action: showArticles
    },
    {
      command: 'clear',
      description: 'Clear the terminal',
      action: clearTerminal
    },
    {
      command: 'contact',
      description: 'Get in touch with Rafael',
      action: showContact
    },
    {
      command: 'help',
      description: 'Show available commands',
      action: showHelp
    },
    {
      command: 'linkedin',
      description: 'Connect on LinkedIn',
      action: showLinkedIn
    },
    {
      command: 'projects',
      description: 'Check out recent projects',
      action: showProjects
    },
    {
      command: 'resume',
      description: 'Download my resume (PDF)',
      action: showResume
    },
    {
      command: 'skills',
      description: 'Technologies and expertise',
      action: showSkills
    }
  ];

  useEffect(() => {
    // Initial welcome message
    const initialLines: TerminalLine[] = [
      {
        id: 1,
        content: (
          <div className="terminal-line">
            <span className="terminal-comment"># Rafael de Mattos - DevOps Engineer Terminal Interface</span>
          </div>
        )
      },
      {
        id: 2,
        content: (
          <div className="terminal-line">
            <span className="terminal-comment"># DevOps engineer engineering things that need (or not) to be engineered</span>
          </div>
        ),
        delay: 500
      },
      {
        id: 3,
        content: (
          <div className="terminal-line mt-4">
            <span className="terminal-success">Welcome to my terminal! Type 'help' to see available commands.</span>
          </div>
        ),
        delay: 1000
      }
    ];

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const showNextLine = () => {
      if (currentIndex < initialLines.length) {
        const currentLine = initialLines[currentIndex];
        if (currentLine) {
          setLines(prev => [...prev, currentLine]);
        }
        currentIndex++;
        
        const delay = initialLines[currentIndex - 1]?.delay || 300;
        if (currentIndex < initialLines.length) {
          timeoutId = setTimeout(showNextLine, delay);
        } else {
          setIsTyping(false);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      } else {
        setIsTyping(false);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    setIsTyping(true);
    timeoutId = setTimeout(showNextLine, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  function showHelp() {
    const helpContent = (
      <div className="terminal-line">
        <div className="mt-2">
          <div className="terminal-highlight">Available commands:</div>
          {commands.map((cmd, index) => (
            <div key={index} className="mt-1 flex">
              <span className="terminal-command inline-block w-28 shrink-0">{cmd.command}</span>
              <span className="terminal-gray">- {cmd.description}</span>
            </div>
          ))}
        </div>
      </div>
    );
    addLine(helpContent);
  }

  function showAbout() {
    const aboutContent = (
      <div className="terminal-line">
        <div className="mt-2">
          <div className="terminal-highlight">About Rafael de Mattos</div>
          <div className="mt-2">
            <div className="terminal-output">I started my career as Software Developer in 2018 and since then I've got curious about how the applications works under the hood. So I started to study more about Linux and cloud technologies and started to assume responsabilities around theses areas. Since then I fall in love with the DevOps culture and started to study more about it, now I'm a DevOps Engineer passionate about automation, infrastructure, and a lot of programming. I created a lot of things over the years i order to understand better how the things works, feel free to check my personal projects using the "projects" command.</div>
          </div>
        </div>
      </div>
    );
    addLine(aboutContent);
  }

  function showArticles() {
    addLine(
      <div className="terminal-line">
        <span className="terminal-success">Loading articles...</span>
      </div>
    );
    setTimeout(() => {
      window.location.href = '/articles';
    }, 300);
  }

  function showProjects() {
    const projectsContent = (
      <div className="terminal-line">
        <div className="mt-2">
          <div className="terminal-highlight">👨‍💻 Recent Projects</div>
          <div className="mt-2 terminal-output">Check out what I'm hacking recently...</div>
          <div className="mt-2">
            <span className="terminal-command">GitHub: </span>
            <a 
              href="https://github.com/rafaelDev0ps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="terminal-blue hover:terminal-green-bright transition-colors underline"
            >
              github.com/rafaelDev0ps
            </a>
          </div>
          <div className="mt-2 terminal-gray">
            • Infrastructure automation tools<br/>
            • DevOps scripts and configurations<br/>
            • Learning projects and experiments
          </div>
        </div>
      </div>
    );
    addLine(projectsContent);
  }


  function showLinkedIn() {
    const linkedinContent = (
      <div className="terminal-line">
        <div className="mt-2">
          <div className="terminal-highlight">😎 Professional Profile</div>
          <div className="mt-2 terminal-output">Want to know more about my career? Let's connect!</div>
          <div className="mt-2">
            <span className="terminal-command">LinkedIn: </span>
            <a 
              href="https://www.linkedin.com/in/rafamttz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="terminal-blue hover:terminal-green-bright transition-colors underline"
            >
              linkedin.com/in/rafamttz
            </a>
          </div>
        </div>
      </div>
    );
    addLine(linkedinContent);
  }

  function showContact() {
    const contactContent = (
      <div className="terminal-line">
        <div className="mt-2">
          <div className="terminal-highlight">📧 Get In Touch</div>
          <div className="mt-2 terminal-output">Feel free to reach out for collaboration or questions!</div>
          <div className="mt-2 terminal-gray">
            • Email: <a href="mailto:devops@rafaelmattos.com" className="terminal-blue hover:terminal-green-bright transition-colors underline">devops@rafaelmattos.com</a><br/>
            • LinkedIn: <a href="https://www.linkedin.com/in/rafamttz" target="_blank" rel="noopener noreferrer" className="terminal-blue hover:terminal-green-bright transition-colors underline">linkedin.com/in/rafamttz</a><br/>
          </div>
        </div>
      </div>
    );
    addLine(contactContent);
  }

  function showResume() {
    const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || "";
    window.open(resumeUrl, '_blank');

    const resumeContent = (
      <div className="terminal-line">
        <div className="mt-2">
          <div className="terminal-highlight">📄 Resume</div>
          <div className="mt-2 terminal-output">Downloading resume... If it didn't start automatically, use the link below:</div>
          <div className="mt-2">
            <span className="terminal-command">Download: </span>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-blue hover:terminal-green-bright transition-colors underline"
            >
              resume.pdf
            </a>
          </div>
        </div>
      </div>
    );
    addLine(resumeContent);
  }

  function showSkills() {
    const skillsContent = (
      <div className="terminal-line">
        <div className="mt-2">
          <div className="terminal-highlight">🛠 Skills & Technologies</div>
          <div className="mt-2 terminal-output">
            I've been working with different technologies over my career, in the past few years
            I dedicated to study and apply my knowledge on multi-cloud solutions (AWS, Azure and GCP)
            and implement different cloud architectures starting from simple workloads using containers
            and/or Kubernetes to intensive data processing, AI and so on.
          </div>
          <div className="mt-2 terminal-output">
            Most of the infrastructure I provisioned using Terraform, Ansible or any Golang/Python
            automation script, also I'm used to monitor applications and other resources with monitoring
            tools like Datadog, Prometheus and Grafana following best practices of monitoring systems.
          </div>
        </div>
      </div>
    );
    addLine(skillsContent);
  }

  function clearTerminal() {
    setLines([]);
  }

  function addLine(content: JSX.Element) {
    if (!content) return; // Safety check
    
    const newLine: TerminalLine = {
      id: Date.now(),
      content
    };
    setLines(prev => [...prev, newLine]);
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    setHistory(prev => [...prev, currentInput.trim()]);
    setHistoryIndex(-1);

    const commandLine = (
      <div className="terminal-line">
        <span className="terminal-prompt">guest_user@host $ </span>
        <span className="terminal-command">{currentInput}</span>
      </div>
    );
    addLine(commandLine);

    const command = commands.find(cmd => cmd.command === currentInput.trim().toLowerCase());
    
    if (command) {
      command.action();
    } else {
      const errorContent = (
        <div className="terminal-line">
          <span className="terminal-error">Command not found: {currentInput}</span>
          <div className="terminal-gray">Type 'help' to see available commands.</div>
        </div>
      );
      addLine(errorContent);
    }

    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (history.length === 0) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setCurrentInput(history[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setCurrentInput('');
      } else {
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex]);
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="h-screen overflow-hidden bg-background text-foreground font-mono p-4 cursor-text flex flex-col"
      onClick={handleTerminalClick}
    >
      <div 
        ref={terminalRef}
        className="space-y-1 flex-1 overflow-y-auto"
      >
        {lines.filter(line => line && line.content).map(line => (
          <div key={line.id}>{line.content}</div>
        ))}

        {!isTyping && (
          <form onSubmit={handleInputSubmit}>
            <div className="flex items-center">
              <span className="terminal-prompt mr-2">guest_user@host $ </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-terminal-blue caret-terminal-cursor"
                autoComplete="true"
                spellCheck={false}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Terminal;
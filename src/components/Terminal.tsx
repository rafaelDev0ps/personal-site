import { useState, useEffect, useRef } from 'react';
import rafaelProfile from '../assets/rafael-profile.jpg';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = [
    {
      command: 'help',
      description: 'Show available commands',
      action: showHelp
    },
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
      command: 'projects',
      description: 'Check out recent projects',
      action: showProjects
    },
    {
      command: 'youtube',
      description: 'Learn DevOps and Linux on YouTube',
      action: showYoutube
    },
    {
      command: 'linkedin',
      description: 'Connect on LinkedIn',
      action: showLinkedIn
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
            <div key={index} className="mt-1">
              <span className="terminal-command">{cmd.command.padEnd(12)}</span>
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
          <div className="mt-2 flex items-start gap-4">
            <img 
              src={rafaelProfile} 
              alt="Rafael de Mattos" 
              className="w-16 h-16 rounded-full border border-terminal-green"
            />
            <div>
              <div className="terminal-output">DevOps Engineer passionate about automation, infrastructure, and sharing knowledge.</div>
              <div className="mt-2 terminal-gray">Skills: Docker, Kubernetes, AWS, Linux, CI/CD, Infrastructure as Code</div>
            </div>
          </div>
        </div>
      </div>
    );
    addLine(aboutContent);
  }

  function showArticles() {
    const articlesContent = (
      <div className="terminal-line">
        <div className="mt-2">
          <div className="terminal-highlight">📰 Articles & Blog Posts</div>
          <div className="mt-2 terminal-output">
            I regularly share content with the DevOps community covering:
          </div>
          <div className="mt-1 terminal-gray">• Container orchestration with Kubernetes</div>
          <div className="terminal-gray">• Infrastructure automation</div>
          <div className="terminal-gray">• Linux system administration</div>
          <div className="terminal-gray">• CI/CD best practices</div>
          <div className="mt-2">
            <span className="terminal-command">Visit: </span>
            <a 
              href="https://rafaelmattos.dev/articles" 
              target="_blank" 
              rel="noopener noreferrer"
              className="terminal-blue hover:terminal-green-bright transition-colors underline"
            >
              rafaelmattos.dev/articles
            </a>
          </div>
        </div>
      </div>
    );
    addLine(articlesContent);
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

  function showYoutube() {
    const youtubeContent = (
      <div className="terminal-line">
        <div className="mt-2">
          <div className="terminal-highlight">📺 YouTube Channel</div>
          <div className="mt-2 terminal-output">Learn about DevOps and Linux on my channel!</div>
          <div className="mt-2">
            <span className="terminal-command">Channel: </span>
            <a 
              href="https://www.youtube.com/channel/UCdAg3KvCfl9FLyUOFAEGiOQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="terminal-blue hover:terminal-green-bright transition-colors underline"
            >
              Rafael de Mattos DevOps
            </a>
          </div>
          <div className="mt-2 terminal-gray">
            Content includes:<br/>
            • DevOps tutorials and best practices<br/>
            • Linux system administration<br/>
            • Container technologies<br/>
            • Infrastructure automation
          </div>
        </div>
      </div>
    );
    addLine(youtubeContent);
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
            • LinkedIn: <a href="https://www.linkedin.com/in/rafamttz" target="_blank" rel="noopener noreferrer" className="terminal-blue hover:terminal-green-bright transition-colors underline">linkedin.com/in/rafamttz</a><br/>
            • GitHub: <a href="https://github.com/rafaelDev0ps" target="_blank" rel="noopener noreferrer" className="terminal-blue hover:terminal-green-bright transition-colors underline">github.com/rafaelDev0ps</a><br/>
            • YouTube: <a href="https://www.youtube.com/channel/UCdAg3KvCfl9FLyUOFAEGiOQ" target="_blank" rel="noopener noreferrer" className="terminal-blue hover:terminal-green-bright transition-colors underline">Rafael de Mattos DevOps</a>
          </div>
        </div>
      </div>
    );
    addLine(contactContent);
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

    // Add command line to history
    const commandLine = (
      <div className="terminal-line">
        <span className="terminal-prompt">rafael@devops:~$ </span>
        <span className="terminal-command">{currentInput}</span>
      </div>
    );
    addLine(commandLine);

    // Execute command
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

  const handleTerminalClick = () => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="min-h-screen bg-background text-foreground font-mono p-4 cursor-text"
      onClick={handleTerminalClick}
    >
      <div 
        ref={terminalRef}
        className="max-w-4xl mx-auto space-y-1 mb-4 max-h-[calc(100vh-8rem)] overflow-y-auto"
      >
        {lines.filter(line => line && line.content).map(line => (
          <div key={line.id}>{line.content}</div>
        ))}
      </div>

      {!isTyping && (
        <form onSubmit={handleInputSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-center">
            <span className="terminal-prompt mr-2">rafael@devops:~$ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-terminal-blue caret-terminal-cursor"
              autoComplete="off"
              spellCheck={false}
            />
            {/* {showCursor && (
              <span className="terminal-cursor w-2 h-5 ml-1 inline-block"></span>
            )} */}
          </div>
        </form>
      )}
    </div>
  );
};

export default Terminal;
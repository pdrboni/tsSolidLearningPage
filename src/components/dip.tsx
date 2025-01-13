import React, { useEffect, useState } from 'react';
import { HomeButton } from './HomeButton';
import '../styles/scss/post.scss';

import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'; // VS Code-like style
import { useTheme } from '../contexts/ThemeContext';

export const DIP = () => {
  const [fadeOutSpinner, setFadeOutSpinner] = useState(false);
  const { theme } = useTheme();

  const badCode = `
    class BackendDeveloper {
      develop() {
        console.log("Writing backend code...");
      }
    }

    class FrontendDeveloper {
      develop() {
        console.log("Writing frontend code...");
      }
    }

    // High-level module depends directly on low-level modules
    class Project {
      private backendDeveloper: BackendDeveloper;
      private frontendDeveloper: FrontendDeveloper;

      constructor() {
        this.backendDeveloper = new BackendDeveloper();
        this.frontendDeveloper = new FrontendDeveloper();
      }

      start() {
        this.backendDeveloper.develop();
        this.frontendDeveloper.develop();
      }
    }

    // Usage
    const project = new Project();
    project.start();
  `;

  const badCode2 = `
    class BackendDeveloper {
      private language: string;

      constructor(language: string) {
        this.language = language;
      }

      develop() {
        console.log(\`Writing backend code in \${this.language}...\`);
      }
    }
  `;

  const badCode3 = `
    class Project {
      private backendDeveloper: BackendDeveloper;
      private frontendDeveloper: FrontendDeveloper;

      constructor() {
        // Now you must specify the language when creating the BackendDeveloper
        this.backendDeveloper = new BackendDeveloper("TypeScript");
        this.frontendDeveloper = new FrontendDeveloper();
      }

      start() {
        this.backendDeveloper.develop();
        this.frontendDeveloper.develop();
      }
    }
`;

  const niceCode = `
    interface Developer {
      develop(): void;
    }

    // Concrete implementations depend on the abstraction
    class BackendDeveloper implements Developer {
      develop() {
        console.log("Writing backend code...");
      }
    }

    class FrontendDeveloper implements Developer {
      develop() {
        console.log("Writing frontend code...");
      }
    }

    // High-level module depends on the abstraction, not concrete classes
    class Project {
      private developers: Developer[];

      constructor(developers: Developer[]) {
        this.developers = developers; // Injected dependency
      }

      start() {
        this.developers.forEach((developer) => developer.develop());
      }
    }

    // Usage
    const backendDev = new BackendDeveloper();
    const frontendDev = new FrontendDeveloper();

    // Dependencies are injected via the constructor
    const project = new Project([backendDev, frontendDev]);
    project.start();
  `;

  useEffect(() => {
    hljs.highlightAll();
    handleFadeOutSpinner();
  }, []);

  const handleFadeOutSpinner = (): void => {
    setTimeout(() => {
      setFadeOutSpinner(true);
    }, 1500); // 3000ms = 3 seconds
  };

  return (
    <>
      <HomeButton />
      <div
        className={`flex-center ${fadeOutSpinner ? 'fade-out' : 'reset-animation'}`}
      >
        <div
          className="spinner-border"
          role="status"
          style={{ width: '3rem', height: '3rem', borderWidth: '0.6rem' }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div
        className={`${fadeOutSpinner ? 'post-fade-in post-container' : 'visually-hidden'}`}
      >
        <h1 className="post-title">Dependency Inversion Principle</h1>
        <div className="paragraph-container">
          <span>
            The Dependency Inversion Principle (DIP) states that high-level
            modules should not depend on low-level modules but rather on
            abstractions. Both should depend from abstractions. Abstractions
            should not depend on details; instead, details should depend on
            abstractions. Verify if the high-level classes are coupled with
            low-level classes. If the answer is YES, consider introducing
            abstractions to make maintenance and code evolution easier.
          </span>
          <div className={`paragraph-image ${theme}`} />
        </div>
        <div className="paragraph-container">
          <div className={`paragraph-image ${theme}`} />
          <ul>
            <strong>Benefits:</strong>
            <li>
              Decoupling: Interface changes are easier to implement and
              don&apos;t affects high-level code.
            </li>
            <li>
              Easier to test: Modules could be tested isolated using
              abstractions. With DIP, you can create mocks for unit tests.
            </li>
          </ul>
        </div>
        <h3 style={{ marginTop: '50px' }}>Bad practice example</h3>
        <div className="paragraph-container">
          <pre>
            <code className="language-javascript">{badCode}</code>
          </pre>
        </div>

        <div className="paragraph-container-no-image">
          <span>
            In the example above, you can see that the class Project depends on
            concrete implementations of back and frontend developers. Any
            changes to the developer classes or adding a new type of developer
            would require modifying the Project class. Let&apos;s say now I want
            to change BackendDeveloper class and want to pass the language to
            the constructor. Now my BackendDeveloper class is like that:
          </span>
        </div>

        <div className="paragraph-container">
          <pre>
            <code className="language-javascript">{badCode2}</code>
          </pre>
        </div>

        <div className="paragraph-container-no-image">
          <span>Now the Project class should be changed, being like that:</span>
        </div>

        <div className="paragraph-container">
          <pre>
            <code className="language-javascript">{badCode3}</code>
          </pre>
        </div>

        <div className="paragraph-container-no-image">
          <span>
            You can see clearly now that it&apos;s hard to maintain this code.
            Also it is hard to test Project class isolated because it can&apos;t
            work without backendDeveloper and frontendDeveloper.
          </span>
        </div>

        <h3 style={{ marginTop: '50px' }}>Nice practice example</h3>
        <div className="paragraph-container">
          <pre>
            <code className="language-javascript">{niceCode}</code>
          </pre>
        </div>

        <div
          className="paragraph-container-no-image"
          style={{ paddingBottom: '50px' }}
        >
          <span>
            Applying DIP, we have the Project class depends only on the
            Developer interface, not the concrete implementations. Adding a new
            type of developer (e.g., MobileDeveloper) doesn&apos;t require
            changes to the Project class. Makes testing easier—mock
            implementations of Developer can be used to test Project.
          </span>
        </div>
      </div>
    </>
  );
};

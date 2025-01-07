import React, { useEffect, useState } from 'react';
import { HomeButton } from './HomeButton';
import '../styles/scss/post.scss';
import IMG_REACT from '../../images/react-logo-svg.svg';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'; // VS Code-like style

export const SRP = () => {
  const [fadeOutSpinner, setFadeOutSpinner] = useState(false);

  const badCode = `
    class UserManager {
      private users: { name: string; email: string }[] = [];

      addUser(name: string, email: string) {
        this.users.push({ name, email });
        this.logAction(\`User \${name} added\`);
        this.sendEmail(email, 'Welcome!', \`Hello \${name}, welcome to our platform!\`);
      }

      private sendEmail(email: string, subject: string, message: string) {
        console.log(\`Sending email to \${email} with subject "\${subject}"\`);
      }

      private logAction(action: string) {
        console.log(\`Log: \${action}\`);
      }

      getUsers() {
        return this.users;
      }
    }
  `;

  const niceCode = `
    class UserManager {
      private users: { name: string; email: string }[] = [];

      addUser(name: string, email: string, emailService: EmailService, logger: Logger) {
        this.users.push({ name, email });
        logger.log(\`User \${name} added\`);
        emailService.sendEmail(email, 'Welcome!', \`Hello \${name}, welcome to our platform!\`);
      }

      getUsers() {
        return this.users;
      }
    }

    class EmailService {
      sendEmail(email: string, subject: string, message: string) {
        console.log(\`Sending email to \${email} with subject "\${subject}"\`);
      }
    }

    class Logger {
      log(message: string) {
        console.log(\`Log: \${message}\`);
      }
    }

    const userManager = new UserManager();
    const emailService = new EmailService();
    const logger = new Logger();

    userManager.addUser('John Doe', 'john.doe@example.com', emailService, logger);
  `;

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const handleFadeOutSpinner = (): void => {
    setTimeout(() => {
      setFadeOutSpinner(true);
    }, 1500); // 3000ms = 3 seconds
  };

  useEffect(() => {
    handleFadeOutSpinner();
  }, []);

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
        className={`post-container ${fadeOutSpinner ? 'fade-in' : 'visually-hidden'}`}
      >
        <h1 className="post-title">Single Responsibility Principle</h1>
        <div className="paragraph-container">
          <span>
            A class should have just one responsibility and one reason to
            change. Robert C. Martin argues in one of his talks, gave us an
            example with roles in an account. An account could have the role of
            visitor, which cannot do anything besides read posts. The same
            account could enter with database administrator role, which has all
            the permissions in our fictional application.
          </span>
          <img className="paragraph-image" src={IMG_REACT} />
        </div>
        <div className="paragraph-container">
          <img className="paragraph-image" src={IMG_REACT} />
          <ul>
            <strong>Benefits:</strong>
            <li>
              Maintainability: classes with one responsibility are easier to
              understand and change.
            </li>
            <li>
              Reuse and Tests: Classes with one responsibility easier to reuse
              and to test.
            </li>
            <li>
              Coupling reduction: Each class could be changed with no impact to
              the others parts of your code.
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
            First of all, this class has multiple responsibilities. It add
            users, it get the users from the data base, it sends emails and it
            makes a generic action. This code is hard to maintain because, if
            the email sending logic changes, this class must change. If the
            generic action changes (in this case the action is a simple log),
            this class must change. But how could we write it right?
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
            Here we have the responsabilities separated in different classes.
            The UserManager class only deals with the addition of users and
            getting them. The EmailService class only send emails. The Logger
            class only log a message. Now UserManager is not coupled with the
            other functions (send emails or logs), and if the logics of this
            functionalities changes, the UserManager will not be affected. Also
            the classes could be tested independentily which makes the tests
            cleaner and easy to understand.
          </span>
        </div>
      </div>
    </>
  );
};

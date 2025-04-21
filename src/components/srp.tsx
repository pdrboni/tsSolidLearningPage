import React, { useEffect, useState } from 'react';
import { HomeButton } from './HomeButton';
import '../styles/scss/post.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'; // VS Code-like style
import { useTheme } from '../contexts/ThemeContext';

export const SRP = () => {
  const [fadeOutSpinner, setFadeOutSpinner] = useState(false);
  const { theme } = useTheme();

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
        <h1 className="post-title">Single Responsibility Principle</h1>
        <div className="paragraph-container">
          <span>
            A class should have just one responsibility and one reason to
            change. Robert C. Martin argues in one of his talks, gave us an
            example with roles in an account. An account could have the role of
            visitor, which cannot do anything besides read posts. The same
            account could enter with database administrator role, which has all
            the permissions in our fictional application. Well in that case each
            role has its own class dealing with its own properties and
            functionalities. It's not a good practice to have a big class
            dealing with tons of functionalities. If that happen, probably you
            should break it apart in more atomized classes.
          </span>
          <div className={`paragraph-image ${theme}`} />
        </div>
        <div className="paragraph-container">
          <div className={`paragraph-image ${theme}`} />
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
            First of all, this class above has multiple responsibilities. It add
            users, it get the users from the data base, it sends emails and it
            makes a generic action (logAction function). This code is hard to
            maintain because, if the email sending logic changes, this class
            must change. If the generic action changes (in this case the action
            is a simple log), this class must change. Let's say I want to update
            the sendEmail logic and must slightly change the signature. Oops,
            the addUser function must change too and if I don't change it, the
            whole function addUser will be damned because the sendEmail function
            inside addUser will gives us an exception. But how could we write it
            right?
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

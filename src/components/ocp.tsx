import React, { useEffect, useState } from 'react';
import { HomeButton } from './HomeButton';
import '../styles/scss/post.scss';

import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'; // VS Code-like style
import { useTheme } from '../contexts/ThemeContext';

export const OCP = () => {
  const [fadeOutSpinner, setFadeOutSpinner] = useState(false);
  const { theme } = useTheme();

  const badCode = `
    class NotificationService {
      sendNotification(type: string, message: string): void {
        if (type === 'email') {
          console.log(\`Sending email with message: \${message}\`);
        } else if (type === 'sms') {
          console.log(\`Sending SMS with message: \${message}\`);
        } else if (type === 'push') {
          console.log(\`Sending Push Notification with message: \${message}\`);
        } else {
          throw new Error('Unknown notification type');
        }
      }
    }

    const notification = new NotificationService();
    notification.sendNotification('email', 'Hello Email!');
    notification.sendNotification('sms', 'Hello SMS!');
    notification.sendNotification('push', 'Hello Push!');
  `;

  const niceCode = `
    interface Notification {
      send(message: string): void;
    }

    class EmailNotification implements Notification {
      send(message: string): void {
        console.log(\`Sending email with message: \${message}\`);
      }
    }

    class SMSNotification implements Notification {
      send(message: string): void {
        console.log(\`Sending SMS with message: \${message}\`);
      }
    }

    class PushNotification implements Notification {
      send(message: string): void {
        console.log(\`Sending Push Notification with message: \${message}\`);
      }
    }

    class NotificationService {
      private notifications: Notification[];

      constructor(notifications: Notification[]) {
        this.notifications = notifications;
      }

      sendAll(message: string): void {
        this.notifications.forEach((notification) => notification.send(message));
      }
    }

    const email = new EmailNotification();
    const sms = new SMSNotification();
    const push = new PushNotification();

    const notificationService = new NotificationService([email, sms, push]);
    notificationService.sendAll('Hello Notifications!');
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
        className={`${fadeOutSpinner ? 'post-fade-in post-container' : 'visually-hidden'}`}
      >
        <h1 className="post-title">Open-closed Principle</h1>
        <div className="paragraph-container">
          <span>
            This principle, tells us a class must be &quot;open to extension but
            closed to change&quot;. Don&apos;t understand? Let me simplify:
            Let&apos;s say you want to add a new functionality to your class.
            You don&apos;t do it creating an &quot;if&quot; or changing your
            original class with other ways. You add this new functionality
            creating another class, extending your original class to it.
          </span>
          <div className={`paragraph-image ${theme}`} />
        </div>
        <div className="paragraph-container">
          <div className={`paragraph-image ${theme}`} />
          <ul>
            <strong>Benefits:</strong>
            <li>
              Easy to extend your code: New functionalities could be add without
              changing the existent code.
            </li>
            <li>
              Bugs reduction: Minimize the risks of introduce errors in
              functionalities which was already implemented.
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
            In the example above, a single class handles all notification types.
            Every time a new type is added, the NotificationService class needs
            to be modified. Modifying the main class, you could bug other parts
            of your code which use this class.
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
            Using OCP, the NotificationService is open for extension (new
            notification types can be added) but closed for modification (no
            changes to existing code). So you have a interface called
            Notification and all the other notification classes must implement
            the method send(). This is achieved using interfaces and
            polymorphism.
          </span>
        </div>
      </div>
    </>
  );
};

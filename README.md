# SOLID Principles

Welcome to my **SOLID Principles** learning page! Here you can learn about SOLID Principles. This app was made with TS, React and SASS. Wasn't used any build tool like Vite or CRA. A Babel and Webpack files was configured from scratch. This setup initial setup combined with "npm i react react-dom" gives us a react app setup to be developed from scratch. Other tools was used like Husky, ESLint and editorconfig.

## Introduction:

These principles establish practices for developing software with considerations for maintaining and extending it as the project grows. Adopting these practices can also help avoid code smells, refactor code, and develop Agile or Adaptive software.

SOLID letters meaning:

- S - Single-responsibility Principle
- O - Open-closed Principle
- L - Liskov Substitution Principle
- I - Interface Segregation Principle
- D - Dependency Inversion Principle

## Single-responsibility Principle:

A class should have just one responsibility and one reason to change. Robert C. Martin argues in one of his talks, gave us an example with roles in an account. An account could have the role of visitor, which cannot do anything besides read posts. The same account could enter with database administrator role, which has all the permissions in our fictional application.

### Benefits:

- Maintainability: classes with one responsibility are easier to understand and change.
- Reuse and Tests: Classes with one responsibility easier to reuse and to test.
- Coupling reduction: Each class could be changed with no impact to the others parts of your code.

### Bad example:

```js
class UserManager {
  private users: { name: string; email: string }[] = [];

  addUser(name: string, email: string) {
    this.users.push({ name, email });
    this.logAction(`User ${name} added`);
    this.sendEmail(email, 'Welcome!', `Hello ${name}, welcome to our platform!`);
  }

  private sendEmail(email: string, subject: string, message: string) {
    console.log(`Sending email to ${email} with subject "${subject}"`);
  }

  private logAction(action: string) {
    console.log(`Log: ${action}`);
  }

  getUsers() {
    return this.users;
  }
}
```

First of all, this class has multiple responsibilities. It add users, it get the users from the data base, it sends emails and it makes a generic action. This code is hard to maintain because, if the email sending logic changes, this class must change. If the generic action changes (in this case the action is a simple log), this class must change. But how could we write it right?

### Nice example:

```js
class UserManager {
  private users: { name: string; email: string }[] = [];

  addUser(name: string, email: string, emailService: EmailService, logger: Logger) {
    this.users.push({ name, email });
    logger.log(`User ${name} added`);
    emailService.sendEmail(email, 'Welcome!', `Hello ${name}, welcome to our platform!`);
  }

  getUsers() {
    return this.users;
  }
}

class EmailService {
  sendEmail(email: string, subject: string, message: string) {
    console.log(`Sending email to ${email} with subject "${subject}"`);
  }
}

class Logger {
  log(message: string) {
    console.log(`Log: ${message}`);
  }
}

const userManager = new UserManager();
const emailService = new EmailService();
const logger = new Logger();

userManager.addUser('John Doe', 'john.doe@example.com', emailService, logger);
```

Here we have the responsabilities separated in different classes. The UserManager class only deals with the addition of users and getting them. The EmailService class only send emails. The Logger class only log a message. Now UserManager is not coupled with the other functions (send emails or logs), and if the logics of this functionalities changes, the UserManager will not be affected. Also the classes could be tested independentily which makes the tests cleaner and easy to understand.

## Open-closed Principle:

This principle, tells us a class must be &quot;open to extension but closed to change&quot;. Don&apos;t understand? Let me simplify: Let&apos;s say you want to add a new functionality to your class. You don&apos;t do it creating an &quot;if&quot; or changing your original class with other ways. You add this new functionality creating another class, extending your original class to it.

### Benefits:

- Easy to extend your code: New functionalities could be add without changing the existent code.
- Bugs reduction: Minimize the risks of introduce errors in functionalities which was already implemented.

### Bad example:

```js
class NotificationService {
  sendNotification(type: string, message: string): void {
    if (type === 'email') {
      console.log(`Sending email with message: ${message}`);
    } else if (type === 'sms') {
      console.log(`Sending SMS with message: ${message}`);
    } else if (type === 'push') {
      console.log(`Sending Push Notification with message: ${message}`);
    } else {
      throw new Error('Unknown notification type');
    }
  }
}

const notification = new NotificationService();
notification.sendNotification('email', 'Hello Email!');
notification.sendNotification('sms', 'Hello SMS!');
notification.sendNotification('push', 'Hello Push!');
```

In the example above, a single class handles all notification types. Every time a new type is added, the NotificationService class needs to be modified. Modifying the main class, you could bug other parts of your code which use this class.

### Nice example:

```js
  interface Notification {
    send(message: string): void;
  }

  class EmailNotification implements Notification {
    send(message: string): void {
      console.log(`Sending email with message: ${message}`);
    }
  }

  class SMSNotification implements Notification {
    send(message: string): void {
      console.log(`Sending SMS with message: ${message}`);
    }
  }

  class PushNotification implements Notification {
    send(message: string): void {
      console.log(`Sending Push Notification with message: ${message}`);
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
```

Using OCP, the NotificationService is open for extension (new notification types can be added) but closed for modification (no changes to existing code). So you have a interface called Notification and all the other notification classes must implement the method send(). This is achieved using interfaces and polymorphism.

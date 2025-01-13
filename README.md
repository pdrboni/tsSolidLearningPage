# SOLI Principles

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

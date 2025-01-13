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

## Liskov Substitution Principle:

This principle tells us that a superclass could be substituted to your subclass without any changes in the functionalities. Let&apos;s get an example with a streaming app. This app have a superclass Account and a subclass PremiumAccount. PremiumAccount class derives from Account class. The premium accounts should have the behavior that accounts has, plus the premium behavior. So the premium account should maintain the behavior of the superclass (Account), which is the apply of OCP, by the way.

### Benefits:

- Consistency and Reliability: Derived classes should maintain the expected behavior of the superclass. This prevent unexpected behaviors from being substituted for subclasses.
- Safe polymorphism: Allows you to change classes without breaking your code.

### Bad example:

```js
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
```

In the example above, you can see that the class Project depends on concrete implementations of back and frontend developers. Any changes to the developer classes or adding a new type of developer would require modifying the Project class. Let's say now I want to change BackendDeveloper class and want to pass the language to the constructor. Now my BackendDeveloper class is like that:

### Nice example:

```js
class PaymentMethod {
  processPayment(amount: number): string {
    throw new Error("processPayment method not implemented");
  }
}

class CreditCardPayment extends PaymentMethod {
  processPayment(amount: number): string {
    return `Paid ${amount} using Credit Card.`;
  }
}

class PaypalPayment extends PaymentMethod {
  processPayment(amount: number): string {
    return `Paid ${amount} using PayPal.`;
  }
}

class BankTransferPayment extends PaymentMethod {
  processPayment(amount: number): string {
    return `Paid ${amount} using Bank Transfer (manual approval required).`;
  }
}

// Usage
const creditCard = new CreditCardPayment();
const paypal = new PaypalPayment();
const bankTransfer = new BankTransferPayment();

processCustomerPayment(creditCard, 100);
processCustomerPayment(paypal, 200);
processCustomerPayment(bankTransfer, 300);
```

Applying LSP, we have the function processPayment from BankTransferPayment returning the amount transferred and it tells us what method was used (Bank Transfer). Now we have the same behavior that we expect from the superclass.

## Interface Segregation Principle:

An interface should not force the implementation of methods they don't use. When you are implementing interfaces, ask yourself if all classes will need all the methods that this interface has. If the answer is "no", maybe you should apply ISP. A common violation occurs when a single, large interface is implemented by multiple classes that only use a subset of the methods.

### Benefits:

- Code cleaner and Flexible: Specific interfaces avoid classes to implement unnecessary methods.
- Maintenance and Easy Test: Classes get easier to maintain and test, since its interfaces are short and straight to the point.

### Bad example:

```js
interface Printer {
  printDocument(): void;
  scanDocument(): void;
  faxDocument(): void;
}

class BasicPrinter implements Printer {
  printDocument(): void {
    console.log("Printing document...");
  }

  scanDocument(): void {
    throw new Error("BasicPrinter cannot scan.");
  }

  faxDocument(): void {
    throw new Error("BasicPrinter cannot fax.");
  }
}

class MultiFunctionPrinter implements Printer {
  printDocument(): void {
    console.log("Printing document...");
  }

  scanDocument(): void {
    console.log("Scanning document...");
  }

  faxDocument(): void {
    console.log("Faxing document...");
  }
}
```

In the example above, The BasicPrinter class is forced to implement methods (scanDocument and faxDocument) that it does not use. Clients using the BasicPrinter might inadvertently call unsupported methods, leading to runtime errors.

### Nice example:

```js
interface Printable {
  printDocument(): void;
}

interface Scannable {
  scanDocument(): void;
}

interface Faxable {
  faxDocument(): void;
}

class BasicPrinter implements Printable {
  printDocument(): void {
    console.log("Printing document...");
  }
}

class MultiFunctionPrinter implements Printable, Scannable, Faxable {
  printDocument(): void {
    console.log("Printing document...");
  }

  scanDocument(): void {
    console.log("Scanning document...");
  }

  faxDocument(): void {
    console.log("Faxing document...");
  }
}
```

Using ISP, each class depends only on the methods it actually uses. Consumers of Printable know it only provides printing functionality, reducing confusion. Adding new functionality (e.g., EmailDocument) does not affect unrelated classes.

## Dependency Inversion Principle:

The Dependency Inversion Principle (DIP) states that high-level modules should not depend on low-level modules but rather on abstractions. Both should depend from abstractions. Abstractions should not depend on details; instead, details should depend on abstractions. Verify if the high-level classes are coupled with low-level classes. If the answer is YES, consider introducing abstractions to make maintenance and code evolution easier.

### Benefits:

- Decoupling: Interface changes are easier to implement and don't affects high-level code.
- Easier to test: Modules could be tested isolated using abstractions. With DIP, you can create mocks for unit tests.

### Bad example:

```js
interface Printer {
  printDocument(): void;
  scanDocument(): void;
  faxDocument(): void;
}

class BasicPrinter implements Printer {
  printDocument(): void {
    console.log("Printing document...");
  }

  scanDocument(): void {
    throw new Error("BasicPrinter cannot scan.");
  }

  faxDocument(): void {
    throw new Error("BasicPrinter cannot fax.");
  }
}

class MultiFunctionPrinter implements Printer {
  printDocument(): void {
    console.log("Printing document...");
  }

  scanDocument(): void {
    console.log("Scanning document...");
  }

  faxDocument(): void {
    console.log("Faxing document...");
  }
}
```

In the example above, you can see that the class Project depends on concrete implementations of back and frontend developers. Any changes to the developer classes or adding a new type of developer would require modifying the Project class. Let's say now I want to change BackendDeveloper class and want to pass the language to the constructor. Now my BackendDeveloper class is like that:

```js
class BackendDeveloper {
  private language: string;

  constructor(language: string) {
    this.language = language;
  }

  develop() {
    console.log(`Writing backend code in ${this.language}...`);
  }
}
```

Now the Project class should be changed, being like that:

```js
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
```

You can see clearly now that it's hard to maintain this code. Also it is hard to test Project class isolated because it can't work without backendDeveloper and frontendDeveloper.

### Nice example:

```js
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
```

Applying DIP, we have the Project class depends only on the Developer interface, not the concrete implementations. Adding a new type of developer (e.g., MobileDeveloper) doesn't require changes to the Project class. Makes testing easier—mock implementations of Developer can be used to test Project.

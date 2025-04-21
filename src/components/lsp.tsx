import React, { useEffect, useState } from 'react';
import { HomeButton } from './HomeButton';
import '../styles/scss/post.scss';

import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'; // VS Code-like style
import { useTheme } from '../contexts/ThemeContext';

export const LSP = () => {
  const { theme } = useTheme();
  const [fadeOutSpinner, setFadeOutSpinner] = useState(false);

  const badCode = `
    class PaymentMethod {
      processPayment(amount: number): string {
        throw new Error("processPayment method not implemented");
      }
    }

    class CreditCardPayment extends PaymentMethod {
      processPayment(amount: number): string {
        return \`Paid \${amount} using Credit Card.\`;
      }
    }

    class PaypalPayment extends PaymentMethod {
      processPayment(amount: number): string {
        return \`Paid \${amount} using PayPal.\`;
      }
    }

    class BankTransferPayment extends PaymentMethod {
      processPayment(amount: number): string {
        return "Bank transfer requires manual approval.";
      }
    }

    // Usage
    const creditCard = new CreditCardPayment();
    const paypal = new PaypalPayment();
    const bankTransfer = new BankTransferPayment();

    processCustomerPayment(creditCard, 100); // Output: Paid 100 using Credit Card.
    processCustomerPayment(paypal, 200);     // Output: Paid 200 using PayPal.
    processCustomerPayment(bankTransfer, 300); // Output: Bank transfer requires manual approval.
  `;

  const niceCode = `
    class PaymentMethod {
      processPayment(amount: number): string {
        throw new Error("processPayment method not implemented");
      }
    }

    class CreditCardPayment extends PaymentMethod {
      processPayment(amount: number): string {
        return \`Paid \${amount} using Credit Card.\`;
      }
    }

    class PaypalPayment extends PaymentMethod {
      processPayment(amount: number): string {
        return \`Paid \${amount} using PayPal.\`;
      }
    }

    class BankTransferPayment extends PaymentMethod {
      processPayment(amount: number): string {
        return \`Paid \${amount} using Bank Transfer (manual approval required).\`;
      }
    }

    // Usage
    const creditCard = new CreditCardPayment();
    const paypal = new PaypalPayment();
    const bankTransfer = new BankTransferPayment();

    processCustomerPayment(creditCard, 100); // Output: Paid 100 using Credit Card.
    processCustomerPayment(paypal, 200);     // Output: Paid 200 using PayPal.
    processCustomerPayment(bankTransfer, 300); // Output: Paid 300 using Bank Transfer (manual approval required).
  `;

  const documentManagerCode1 = `
    abstract class FileStorage {
      abstract save(data: string, filename: string): void;
      abstract read(filename: string): string;
    }

    class LocalFileStorage extends FileStorage {
      save(data: string, filename: string): void {
        fs.writeFileSync(filename, data);
      }

      read(filename: string): string {
        return fs.readFileSync(filename, 'utf-8');
      }
    }

    class CloudStorage extends FileStorage {
      save(data: string, filename: string): void {
        // Simulate uploading to the cloud
        cloudApi.upload(filename, data);
      }

      read(filename: string): string {
        return cloudApi.download(filename);
      }
    }
  `;

  const documentManagerCode2 = `
    class ReadOnlyStorage extends FileStorage {
      save(data: string, filename: string): void {
        // ReadOnly storage, cannot save!
        console.log("This storage is read-only.");
      }

      read(filename: string): string {
        return fs.readFileSync(filename, 'utf-8');
      }
    }
  `;

  const documentManagerCode3 = `
    function persistUserSettings(storage: FileStorage, userId: string, settings: string) {
      const filename = \`\${userId}-settings.json\`;
      storage.save(settings, filename);
    }
  `;

  const documentManagerCode4 = `
    const storage = new ReadOnlyStorage();
    persistUserSettings(storage, 'user123', '{"theme":"dark"}'); // This won't save nothing
  `;

  const throwErrorCode = `
    throw new Error("Cannot save: read-only storage");
  `;

  const differentInterfaces = `
    interface ReadableStorage {
      read(filename: string): string;
    }

    interface WritableStorage extends ReadableStorage {
      save(data: string, filename: string): void;
    }
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
        <h1 className="post-title">Liskov Substitution Principle</h1>
        <div className="paragraph-container">
          <span>
            This principle tells us that a superclass could be substituted to
            your subclass without any changes in the functionalities. Let&apos;s
            get an example with a streaming app. This app have a superclass
            Account and a subclass PremiumAccount. PremiumAccount class derives
            from Account class. The premium accounts should have the behavior
            that accounts has, plus the premium behavior. So the premium account
            should maintain the behavior of the superclass (Account), which is
            the apply of OCP, by the way.
          </span>
          <div className={`paragraph-image ${theme}`} />
        </div>
        <div className="paragraph-container">
          <div className={`paragraph-image ${theme}`} />
          <ul>
            <strong>Benefits:</strong>
            <li>
              Consistency and Reliability: Derived classes should maintain the
              expected behavior of the superclass. This prevent unexpected
              behaviors from being substituted for subclasses.
            </li>
            <li>
              Safe polymorphism: Allows you to change classes without breaking
              your code.
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
            In the example above, the class BankTransferPayment doesn&apos;t
            follow the behavior of PaymentMethod. We want the function
            processPayment in PaymentMethod returns us a message of what payment
            method was used and the amount transfered. In the example above,
            when the user uses processPayment from BankTransferPayment class it
            just gets an confusing message saying that requires manual approval
            (the behavior is different of what we want).
          </span>
        </div>

        <h3 style={{ marginTop: '50px' }}>Nice practice example</h3>
        <div className="paragraph-container">
          <pre>
            <code className="language-javascript">{niceCode}</code>
          </pre>
        </div>

        <div className="paragraph-container-no-image">
          <span>
            Applying LSP, we have the function processPayment from
            BankTransferPayment returning the amount transferred and it tells us
            what method was used (Bank Transfer). Now we have the same behavior
            that we expect from the superclass.
          </span>
        </div>
        <br />
        <h3 style={{ marginTop: '50px', marginBottom: '20px' }}>
          Still doesn't got it?
        </h3>
        <div className="paragraph-container-no-image">
          <span>
            Let me give you another example, now a more real-world example.
            Let’s say you’re building a document management system, and you
            define this base class:
          </span>
        </div>
        <div className="paragraph-container">
          <pre>
            <code className="language-javascript">{documentManagerCode1}</code>
          </pre>
        </div>
        <div className="paragraph-container-no-image">
          <span>
            So far, so good. Both are substitutable. Now let’s introduce a new
            subclass:
          </span>
        </div>
        <div className="paragraph-container">
          <pre>
            <code className="language-javascript">{documentManagerCode2}</code>
          </pre>
        </div>
        <div className="paragraph-container-no-image">
          <span>
            Okay, we see that the save function does not follow the standard of
            the save function in other subclasses. But what's the matter? Let's
            say in some part of your app, you expect to be able to save data
            through any FileStorage, like in this function:
          </span>
        </div>
        <div className="paragraph-container">
          <pre>
            <code className="language-javascript">{documentManagerCode3}</code>
          </pre>
        </div>
        <div className="paragraph-container-no-image">
          <span>
            Now if someone passes a ReadOnlyStorage object as a parameter to the
            persistUserSettings function, the save function won't save nothing
            at all!
          </span>
        </div>
        <div className="paragraph-container">
          <pre>
            <code className="language-javascript">{documentManagerCode4}</code>
          </pre>
        </div>
        <div className="paragraph-container-no-image">
          <span>
            This will result in:
            <ul className="mt-2">
              <li>No exception thrown.</li>
              <li>Nothing is saved.</li>
              <li>User's settings are lost.</li>
              <li>
                Debugging is a nightmare because everything seems to be working
                — there's just a silent failure.
              </li>
            </ul>
          </span>
        </div>
        <br />
        <div className="paragraph-container-no-image">
          <span>
            So what is the solution? First of all, don’t make ReadOnlyStorage a
            subclass of FileStorage — because it doesn't behave like a true
            storage system. You also could add some Throw Error in save
            function:
          </span>
        </div>
        <div className="paragraph-container">
          <pre>
            <code className="language-javascript">{throwErrorCode}</code>
          </pre>
        </div>
        <div className="paragraph-container-no-image">
          <span>Or better, use different interfaces:</span>
        </div>
        <div className="paragraph-container">
          <pre>
            <code className="language-javascript">{differentInterfaces}</code>
          </pre>
        </div>
        <div
          className="paragraph-container-no-image"
          style={{ paddingBottom: '50px' }}
        >
          <span>
            Now persistUserSettings() can require WritableStorage specifically —
            and it's impossible to pass something that doesn’t actually save.
          </span>
        </div>
      </div>
    </>
  );
};

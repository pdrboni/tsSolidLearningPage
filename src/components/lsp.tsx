import React, { useEffect, useState } from 'react';
import { HomeButton } from './HomeButton';
import '../styles/scss/post.scss';
import IMG_REACT from '../../images/react-logo-svg.svg';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'; // VS Code-like style

export const LSP = () => {
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
    processCustomerPayment(bankTransfer, 300); // Output: Paid 300 using Bank Transfer (manual approval required)..
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
          <img className="paragraph-image" src={IMG_REACT} />
        </div>
        <div className="paragraph-container">
          <img className="paragraph-image" src={IMG_REACT} />
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

        <div
          className="paragraph-container-no-image"
          style={{ paddingBottom: '50px' }}
        >
          <span>
            Applying LSP, we have the function processPayment from
            BankTransferPayment returning the amount transferred and it tells us
            what method was used (Bank Transfer). Now we have the same behavior
            that we expect from the superclass.
          </span>
        </div>
      </div>
    </>
  );
};

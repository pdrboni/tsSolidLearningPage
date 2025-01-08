import React, { useEffect, useState } from 'react';
import { HomeButton } from './HomeButton';
import '../styles/scss/post.scss';
import IMG_REACT from '../../images/react-logo-svg.svg';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'; // VS Code-like style

export const ISP = () => {
  const [fadeOutSpinner, setFadeOutSpinner] = useState(false);

  const badCode = `
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
  `;

  const niceCode = `
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
        <h1 className="post-title">Interface Segregation Principle</h1>
        <div className="paragraph-container">
          <span>
            An interface should not force the implementation of methods they
            don&apos;t use. When you are implementing interfaces, ask yourself
            if all classes will need all the methods that this interface has. If
            the answer is &quot;no&quot;, maybe you should apply ISP. A common
            violation occurs when a single, large interface is implemented by
            multiple classes that only use a subset of the methods.
          </span>
          <img className="paragraph-image" src={IMG_REACT} />
        </div>
        <div className="paragraph-container">
          <img className="paragraph-image" src={IMG_REACT} />
          <ul>
            <strong>Benefits:</strong>
            <li>
              Code cleaner and Flexible: Specific interfaces avoid classes to
              implement unnecessary methods.
            </li>
            <li>
              Maintenance and Easy Test: Classes get easier to maintain and
              test, since its interfaces are short and straight to the point.
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
            In the example above, The BasicPrinter class is forced to implement
            methods (scanDocument and faxDocument) that it does not use. Clients
            using the BasicPrinter might inadvertently call unsupported methods,
            leading to runtime errors.
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
            Using ISP, each class depends only on the methods it actually uses.
            Consumers of Printable know it only provides printing functionality,
            reducing confusion. Adding new functionality (e.g., EmailDocument)
            does not affect unrelated classes.
          </span>
        </div>
      </div>
    </>
  );
};

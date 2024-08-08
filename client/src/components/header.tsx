import factorialLogo from '/factorial-logo.png';

export const Header = () => {
  return (
    <header>
      <nav className="border-b p-3">
        <a
          className="inline-block"
          href="https://factorialhr.com/"
          target="_blank"
        >
          <img src={factorialLogo} className="h-12" alt="Factorial logo" />
        </a>
      </nav>
    </header>
  );
};

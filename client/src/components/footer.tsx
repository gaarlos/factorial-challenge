export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex justify-center gap-6 p-8">
        <span>{new Date().getFullYear()} &copy; Carlos Robres Olaya</span>
        <a
          className="text-blue-500"
          href="https://www.linkedin.com/in/carlos-robres/"
          target="_blank"
        >
          LinkedIn
        </a>
        <a
          className="text-blue-500"
          href="https://github.com/gaarlos"
          target="_blank"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

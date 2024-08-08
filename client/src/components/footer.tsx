export const Footer = () => {
  return (
    <footer className="border-t h-32 flex justify-center pt-10 gap-6">
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
    </footer>
  );
};

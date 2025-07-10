declare module 'react-gravatar' {
  interface GravatarProps {
    email: string;
    size?: number;
    className?: string;
  }

  const Gravatar: React.FC<GravatarProps>;
  export { Gravatar };
}

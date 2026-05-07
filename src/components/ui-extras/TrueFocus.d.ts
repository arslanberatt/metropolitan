declare module '@/components/ui-extras/TrueFocus' {
  interface TrueFocusProps {
    sentence?: string;
    separator?: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    glowColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
  }
  const TrueFocus: (props: TrueFocusProps) => JSX.Element;
  export default TrueFocus;
}

import { useTheme } from "next-themes";
import { BackgroundGradientAnimation } from "./background-gradient-animation";

export const BgClientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { theme } = useTheme();

  return (
    <BackgroundGradientAnimation theme={theme as "light" | "dark"}>
      {children}
    </BackgroundGradientAnimation>
  );
};

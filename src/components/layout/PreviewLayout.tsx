import { ReactNode } from 'react';
import { useDocument } from '../../context/DocumentContext';
import { useTheme } from '../../hooks';
import { createTheme, themeToCSSVariables } from '../../themes';
import styles from './layout.module.css';

interface PreviewLayoutProps {
  children: ReactNode;
}

export function PreviewLayout({ children }: PreviewLayoutProps) {
  const { document } = useDocument();
  const { theme } = useTheme(document.stylePreset, document.colorMode);
  const cssVars = themeToCSSVariables(theme);

  const style: Record<string, string> = {};
  Object.entries(cssVars).forEach(([key, value]) => {
    style[key] = value;
  });

  return (
    <main
      className={styles.previewLayout}
      style={style as React.CSSProperties}
      role="main"
      aria-label="תצוגה מקדימה של המסמך"
    >
      <div className={styles.previewContent}>{children}</div>
    </main>
  );
}

interface ExportPreviewLayoutProps {
  children: ReactNode;
  stylePreset: string;
  colorMode: string;
}

export function ExportPreviewLayout({ children, stylePreset, colorMode }: ExportPreviewLayoutProps) {
  const theme = createTheme(stylePreset as any, colorMode as any);
  const cssVars = themeToCSSVariables(theme);

  const style: Record<string, string> = {};
  Object.entries(cssVars).forEach(([key, value]) => {
    style[key] = value;
  });

  return (
    <main
      className={styles.exportLayout}
      style={style as React.CSSProperties}
      role="main"
    >
      <div className={styles.exportContent}>{children}</div>
    </main>
  );
}

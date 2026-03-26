import { useMemo } from 'react';
import { theme } from 'antd';
import type { ConfigProviderProps, ThemeConfig } from 'antd';
import { createStyles } from 'antd-style';

// กำหนด return type ให้ useStyles เพื่อความชัดเจน
const useStyles = createStyles(({ css, token }) => {
  const illustrationBorder = {
    border: `${token.lineWidth} solid ${token.colorBorder}`,
  };

  const illustrationBox = {
    ...illustrationBorder,
    boxShadow: `4px 4px 0 ${token.colorBorder}`,
  };

  return {
    illustrationBorder: css(illustrationBorder),
    illustrationBox: css(illustrationBox),
    buttonRoot: css({
      ...illustrationBox,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    }),
    modalContainer: css({
      ...illustrationBox,
    }),
    tooltipRoot: css({
      padding: token.padding,
    }),
    popupBox: css({
      ...illustrationBox,
      borderRadius: token.borderRadiusLG,
      backgroundColor: token.colorBgContainer,
    }),
    progressRail: css({
      border: `${token.lineWidth} solid ${token.colorBorder}`,
      boxShadow: `2px 2px 0 ${token.colorBorder}`,
    }),
    // progressTrack: css({
    //   border: 'none',
    // }),
  };
});

const useIllustrationTheme = (): ConfigProviderProps => {
  const { styles } = useStyles();

  // แยก Theme Object ออกมาเพื่อให้ Type แม่นยำ (ThemeConfig)
  const themeConfig: ThemeConfig = useMemo(() => ({
    algorithm: theme.defaultAlgorithm,
    token: {
      colorText: '#2C2C2C',
      colorPrimary: '#52C41A',
      colorSuccess: '#51CF66',
      colorWarning: '#FFD93D',
      colorError: '#FA5252',
      colorInfo: '#4DABF7',
      colorBorder: '#2C2C2C',
      colorBorderSecondary: '#2C2C2C',
      lineWidth: 3,
      lineWidthBold: 3,
      borderRadius: 12,
      borderRadiusLG: 16,
      borderRadiusSM: 8,
      controlHeight: 40,
      controlHeightSM: 34,
      controlHeightLG: 48,
      fontSize: 15,
      fontWeightStrong: 600,
      colorBgBase: '#FFF9F0',
      colorBgContainer: '#FFFFFF',
    },
    components: {
      Button: {
        primaryShadow: 'none',
        dangerShadow: 'none',
        defaultShadow: 'none',
        fontWeight: 600,
      },
      Modal: {
        boxShadow: 'none',
      },
      Card: {
        boxShadow: '4px 4px 0 #2C2C2C',
        colorBgContainer: '#f4f4f4',
      },
      Tooltip: {
        colorBorder: '#2C2C2C',
        colorBgSpotlight: 'rgba(100, 100, 100, 0.95)',
        borderRadius: 8,
      },
      Select: {
        optionSelectedBg: 'transparent',
      },
      Slider: {
        dotBorderColor: '#237804',
        dotActiveBorderColor: '#237804',
        colorPrimaryBorder: '#237804',
        colorPrimaryBorderHover: '#237804',
      },
    },
  }), []);

  return useMemo<ConfigProviderProps>(
    () => ({
      theme: themeConfig,
      // การส่ง className ผ่าน ConfigProvider ต้องระบุให้ถูก component property
      button: {
        className: styles.buttonRoot,
      },
      modal: {
        classNames: {
          content: styles.modalContainer,
        },
      },
      alert: {
        className: styles.illustrationBorder,
      },
      colorPicker: {
        className: styles.illustrationBox,
      },
      popover: {
        className: styles.illustrationBox,
      },
      tooltip: {
        className: styles.tooltipRoot,
        classNames: {
          root: styles.illustrationBox,
        },
      },
      select: {
        className: styles.illustrationBox,
        // popupClassName มีไว้สำหรับเวอร์ชันเก่า หรือใช้ classNames.popup.root สำหรับ v5
        dropdownStyle: { padding: 0 },
      },
      input: {
        className: styles.illustrationBox,
      },
      inputNumber: {
        className: styles.illustrationBox,
      },
      progress: {
        className: styles.progressRail,
      },
    }),
    [styles, themeConfig],
  );
};

export default useIllustrationTheme;
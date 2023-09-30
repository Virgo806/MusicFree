import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Config from '@/core/config';
import {ImgAsset} from '@/constants/assetsConst';
import Image from './image';
import useColors from '@/hooks/useColors';

function PageBackground() {
    const themeConfig = Config.useConfig('setting.theme');
    const colors = useColors();

    return (
        <>
            <View
                style={[
                    style.wrapper,
                    {
                        backgroundColor:
                            colors?.pageBackground ?? colors.background,
                    },
                ]}
            />
            <Image
                uri={themeConfig?.background}
                emptySrc={ImgAsset.backgroundDefault}
                style={[
                    style.wrapper,
                    {
                        opacity: themeConfig?.backgroundOpacity ?? 0.7,
                    },
                ]}
                blurRadius={themeConfig?.backgroundBlur ?? 20}
            />
        </>
    );
}
export default memo(PageBackground, () => true);

const style = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
});

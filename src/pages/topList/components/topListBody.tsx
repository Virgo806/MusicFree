import React, {useCallback, useState} from 'react';
import {Text} from 'react-native';
import rpx from '@/utils/rpx';
import PluginManager from '@/core/pluginManager';
import {TabBar, TabView} from 'react-native-tab-view';
import {fontWeightConst} from '@/constants/uiConst';
import BoardPanelWrapper from './boardPanelWrapper';
import useColors from '@/hooks/useColors';

export default function TopListBody() {
    const routes = PluginManager.getSortedTopListsablePlugins().map(_ => ({
        key: _.hash,
        title: _.name,
    }));
    const [index, setIndex] = useState(0);
    const colors = useColors();

    const renderScene = useCallback(
        (props: {route: {key: string}}) => (
            <BoardPanelWrapper hash={props?.route?.key} />
        ),
        [],
    );

    return (
        <TabView
            lazy
            navigationState={{
                index,
                routes,
            }}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    style={{
                        backgroundColor: colors.backdrop,
                        shadowColor: 'transparent',
                        borderColor: 'transparent',
                    }}
                    tabStyle={{
                        width: rpx(200),
                    }}
                    scrollEnabled
                    inactiveColor={colors.text}
                    activeColor={colors.primary}
                    renderLabel={({route, focused, color}) => (
                        <Text
                            numberOfLines={1}
                            style={{
                                fontWeight: focused
                                    ? fontWeightConst.bolder
                                    : fontWeightConst.medium,
                                color,
                            }}>
                            {route.title}
                        </Text>
                    )}
                    indicatorStyle={{
                        backgroundColor: colors.primary,
                        height: rpx(4),
                    }}
                />
            )}
            style={{
                backgroundColor: colors.background,
            }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: rpx(750)}}
        />
    );
}

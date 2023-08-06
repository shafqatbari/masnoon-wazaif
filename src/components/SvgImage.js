import React from 'react'
import { Image, View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image'

const getWidth = props => {
    if (Array.isArray(props.style)) {
        let width;
        for (const style of props.style) { if (style && style.width) { width = style.width } }

        if (!width) width = 0

        return width
    } else {
        return props.style.width
    }
}

const getHeight = props => {
    if (Array.isArray(props.style)) {
        let height;
        for (const style of props.style) { if (style && style.height) { height = style.height } }

        if (!height) height = 0

        return height
    } else {
        return props.style.height
    }
}

const hasPercent = value => {
    return typeof value === 'string' && value.includes('%')
}

const SvgImage = props => (
    <View style={[props.style, { width: hasPercent(getWidth(props)) ? '100%' : props.width, height: hasPercent(getHeight(props)) ? '100%' : props.height }, style.removePadding, style.removeMargin]}>
        {
            props.source ?
                typeof props.source == 'number' || typeof props.source == 'string' || typeof props.source == 'object' ?
                    // typeof props.source === 'number' ?
                    <FastImage style={[props.style, {}]} source={props.source} resizeMode={props.resizeMode ? props.resizeMode : "contain"} /> :
                    <props.source style={[props.style, {}]} width={getWidth(props)} height={getHeight(props)} /> :
                null
        }
    </View>
)

const style = StyleSheet.create({
    removePadding: { paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, padding: 0, right: 0, left: 0, top: 0, bottom: 0 },
    removeMargin: { marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0, margin: 0 }
})

export default SvgImage;

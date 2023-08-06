import React, { useState, useEffect, useContext } from "react";
import {
    TextInput,
} from "react-native-paper";
import colors from "../helpers/colors";


export default TextInputPaper = ({
    value, label, mode, dense,
    placeholder, onChangeText,
    textColor,
    secureTextEntry,
    keyboardType,
    rightImage,
    rightIcon,
    isLoading,
    btnActionShowInformation,
    rightIconColor,
    rightText,
    rightTextColor,
    editable,
    maxLength,
}) => {


    return (
        <TextInput
            right={
                rightImage ?
                    <TextInput.Icon
                        name={
                            rightIcon ? rightIcon : () => isLoading && <ActivityIndicator
                                color={colors.black}
                                size={'small'}
                                style={{ marginRight: 10 }}
                            />}
                        rippleColor={'transparent'}
                        size={20}
                        onPress={btnActionShowInformation}
                        color={rightIconColor}
                    /> :
                    <TextInput.Affix text={rightText ? rightText : ""}
                        theme={{
                            colors: {
                                text: rightTextColor ? rightTextColor : colors.black,
                            },
                            // fonts: { regular: axiRegularFontFamily }
                        }}
                    />
            }
            mode={mode ? mode : "outlined"}
            dense={dense ? dense : true}
            theme={{
                colors: { primary: textColor ? textColor : "#4076CB", underlineColor: "transparent" },
                roundness: 20,
            }}
            placeholder={placeholder}
            label={label}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry && secureTextEntry}
            keyboardType={keyboardType ? keyboardType : 'default'}
            editable={editable}
            maxLength={maxLength && maxLength}

        />
    )
}

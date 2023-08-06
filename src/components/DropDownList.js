/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
    FlatList,
    Text,
    Keyboard,
    TouchableOpacity,
    I18nManager,
    ActivityIndicator,
} from 'react-native';
import Dropdown from "react-native-modal-dropdown-with-flatlist";
import SvgImage from '../components/SvgImage';
import colors from '../helpers/colors';
import { screenHeight, screenWidth } from '../helpers/Constants';



const DropDownList = (props) => {

    const [arrayNew, setArrayNew] = useState([])
    const [selectedId, setSelectedId] = useState()
    const [flagShow, setFlagShow] = useState(false)
    const [focus, setFocus] = useState(false)

    const [enteredText, setEnteredText] = useState('');

    let heightOfCell = 40
    return (
        <View style={{ flexDirection: 'row', flex: 1 }}>
            <Dropdown
                isFullWidth={false}
                adjustFrame={(object) => {
                    var process = {
                        height: object.height,
                        top: object.top,
                    }
                    object.right && (process.left = object.right)
                    object.left && (process.right = object.left)
                    object.wdith && (process.width = object.width)
                    return (props.shouldSwap && I18nManager.isRTL) ? process : object
                }}
                animated={false}
                keyboardShouldPersistTaps={"always"}
                enableEmptySections
                defaultValue={props.value ? props.value : props.placeHolder ? props.placeHolder : ''}
                options={props.array ? props.array : []}
                disabled={props.array && props.array.length > 0 ? false : true}
                style={[{
                    flex: 1,
                    // marginRight: 40,
                    width: screenWidth - 40,
                    justifyContent: 'center',


                },]}
                textStyle={[{
                    //flex: 1,
                    alignSelf: 'flex-start',
                    paddingVertical: 14,
                    paddingLeft: 10,
                    paddingRight: 30,
                    color: colors.black,
                    backgroundColor: 'transparent',
                    textAlign: I18nManager.isRTL ? 'right' : 'left',

                },]}
                dropdownStyle={[{
                    width: props.dropdownWidth ? props.dropdownWidth : screenWidth - 40,
                    height: (props.array && props.array.length == 0) ? 1 : (props.array && props.array.length <= props.rowsToShow ? props.array && props.array.length * heightOfCell : props.rowsToShow * heightOfCell),
                    borderRadius: 4,
                    marginStart: props.dropdownMarginStart ? props.dropdownMarginStart : 0
                }]}
                renderRow={(value) =>
                    <View
                        onLayout={(event) => {
                            heightOfCell = event.nativeEvent.layout.height
                        }}
                        style={{
                            width: '100%',
                            backgroundColor: colors.white,
                            justifyContent: 'center',
                        }}
                        pointerEvents="none"
                    >
                        {/* <SimpleLabel
                            color={colors.lightBlack}
                            fontSizeDropDown={fontSize14}
                            backgroundColor={'transparent'}
                            fontFamily={axiLightFontFamily.fontFamily}
                            padding={10}
                            title={value.value}
                            alignSelf={'flex-start'}
                            textAlign={I18nManager.isRTL ? 'right' : 'left'}
                            marginRight={I18nManager.isRTL ? 2 : 5}
                        /> */}
                        <Text style={{ color: colors.black, fontSize: 16 }} >
                            {value.value}
                        </Text>
                    </View>
                }
                renderButtonText={(value) =>
                    // <SimpleLabel
                    //     color={props.dropDownTextColor ? props.dropDownTextColor : colors.white}
                    //     backgroundColor={'transparent'}
                    //     fontFamily={axiLightFontFamily.fontFamily}
                    //     fontSizeDropDown={fontSize14}
                    //     title={value.value}
                    //     padding={10}
                    //     alignSelf={'flex-start'}
                    //     justifyContent={'center'}
                    //     textAlign={I18nManager.isRTL ? 'right' : 'left'}
                    //     marginRight={I18nManager.isRTL ? 2 : 5}
                    // />
                    <Text>
                        {value.value}
                    </Text>
                }
                onSelect={(index) => {
                    setEnteredText(props.array[index].value);
                    props.callbackFromParent(index);
                }}
                onDropdownWillShow={index => {
                    Keyboard.dismiss();
                    setFocus(true)
                }}
                onDropdownWillHide={index => setFocus(false)}
            />
            <View style={{
                justifyContent: 'flex-start',
                position: 'absolute',
                right: 10,
                alignSelf: 'center',

            }}>
                {props.rightIcon &&
                    <SvgImage
                        source={props.rightIcon}
                        style={[{ height: 20, width: 20, color: colors.black, }]}
                        resizeMode="contain"
                    />
                }
            </View>

        </View>

    )





}

export default DropDownList

const styles = StyleSheet.create({
    inputStyle: {
    },
    viewInputStyle: {
    },
    textStyle: {
        color: colors.lightBlack,
    },
});


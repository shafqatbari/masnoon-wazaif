import React, { useState, useImperativeHandle, useRef } from 'react';
import { Modal, View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import BottomeSheet from './Bottomsheet.js';
const screenHeight = Dimensions.get("screen").height
import SvgImage from './SvgImage.js';
const BottomSheetComponent = React.forwardRef(({ maxheight = 0,
    leftimage, title, image, Bottomimage, stictOpen, disableDrag, hideCrossIcon, sheetData, onOpen, titleStyle, closeOnPressBack }, ref) => {
    const [height, setHeight] = useState();
    const [isDialogVisible, showDialog] = useState()
    const sheetRef = useRef();

    const onClose = () => {
        showDialog(false)
        setHeight(0)
    }

    useImperativeHandle(ref, () => ({
        open: () => {
            showDialog(true)
            setHeight(-1)
        },
        close: () => {
            showDialog(false)
            setHeight(0)
        }
    }));
    //leftimage ? 'white' : '#BDEFDE',
    const renderSheetData = () => (
        <View style={{ backgroundColor: 'white' }}>
            <View style={{ backgroundColor: "white", marginHorizontal: 20, paddingBottom: 20, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    {/* {leftimage && (
                        <TouchableOpacity onPress={() => ref.current.close()}>
                            <View style={{ alignItems: 'flex-start', paddingVertical: 10, justifyContent: "center" }}>
                                <SvgImage
                                    source={leftimage}
                                    style={{ width: 15, height: 31 }}
                                />
                            </View>
                        </TouchableOpacity>
                    )} */}
                    {/* <View style={{ flexDirection: 'row', width: '100%', paddingVertical: 10, alignItems: 'center', fontSize: 44, justifyContent: 'center' }} >

                        <Text style={{ fontFamily: 'billy', fontSize: 45, color: '#2D8BBE', fontWeight: '400', paddingTop: 3, }}>{title}</Text>

                        <SvgImage
                            source={image}
                            style={{ width: 25, height: 25 }}
                        />


                    </View> */}


                </View>
            </View>

            <ScrollView style={{ backgroundColor: 'white' }}>


                {sheetData && sheetData()}
                {/* <View style={{ flex: 1, alignItems: 'center', marginTop: 70, marginBottom: 30 }}>
                    <SvgImage
                        source={Bottomimage}
                        style={{ width: 46, height: 47, }}
                    />
                </View> */}
            </ScrollView >
        </View>
    )

    return (
        <View>
            {
                isDialogVisible && height > 0 &&
                <View
                    onLayout={(event) => {
                        sheetRef.current.open()
                    }} style={{ backgroundColor: '#BDEFDE' }}>
                    <BottomeSheet
                        maxheight={maxheight}
                        stictOpen={false}
                        height={height}
                        onClose={onClose}
                        onOpen={onOpen}
                        refRBSheet={sheetRef}
                        closeOnPressBack={closeOnPressBack}>
                        {renderSheetData()}
                    </BottomeSheet>
                </View>
            }
            {
                isDialogVisible && height === -1 &&
                <View style={{ opacity: 0 }}>
                    <Modal style={{ opacity: 0 }}
                        transparent={true}>
                        <View style={{ opacity: 0 }}
                            onLayout={(event) => {
                                const layoutHeight = event.nativeEvent.layout.height
                                const maxHeight = Math.ceil(screenHeight * .8)

                                setTimeout(() => { setHeight(layoutHeight > maxHeight ? maxHeight : layoutHeight) }, 100)
                            }}>
                            <ScrollView>
                                {renderSheetData()}
                            </ScrollView>
                        </View>
                    </Modal>
                </View>
            }
        </View>
    );
})
const styles = StyleSheet.create({
    item: {
        marginTop: 10,
        marginLeft: 22,
        marginRight: 15
    },

});

export default BottomSheetComponent;

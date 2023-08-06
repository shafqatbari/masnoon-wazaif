import React from 'react';
import {
    View,
    SafeAreaView,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Platform,
    Image
} from 'react-native';
import colors from '../../../helpers/colors';
import { strings } from '../../../helpers/Localization';
import SvgImage from '../../../components/SvgImage'
import { screenHeight, screenWidth } from '../../../helpers/Constants';
import { DropDownIcon, FileUpload, ViewFiles } from '../../../helpers/CommonImages';
import storage from "@react-native-firebase/storage";
import DocumentPicker from "react-native-document-picker";
import CustomActivityIndicator from '../../../components/CustomActivityIndicator'

const UploadFileComponent = ({
    navigation,
    isLoading,
    filePath,
    btnActionUploadFile,
    btnActionSelectFile,
}) => {




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }
        }>
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <CustomActivityIndicator
                    isLoading={isLoading}
                />
                <View style={{ width: screenWidth, height: screenHeight * 0.3, justifyContent: 'center', alignItems: 'center', }} >
                    <Text style={{ color: colors.black, fontSize: 36 }} >
                        Select File
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <TouchableOpacity

                        onPress={btnActionSelectFile}
                        style={{
                            backgroundColor: colors.GreenLightBlur, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 20,
                            justifyContent: 'center', alignItems: 'center'
                        }}
                    >
                        <SvgImage
                            source={ViewFiles}
                            style={{ height: 40, width: 40, }}
                        />
                        <Text style={{ marginTop: 5, color: colors.black }} >
                            Select File
                        </Text>

                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 16, color: colors.black, paddingHorizontal: 20, marginVertical: 5 }} >
                    Selected File : {filePath && filePath.name ? filePath.name : ''}
                </Text>
                <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }} >
                    <TouchableOpacity

                        onPress={btnActionUploadFile}
                        style={{
                            backgroundColor: colors.GreenLightBlur, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 20,
                            justifyContent: 'center', alignItems: 'center'
                        }}
                    >
                        <SvgImage
                            source={FileUpload}
                            style={{ height: 40, width: 40, }}
                        />
                        <Text style={{ marginTop: 5, color: colors.black }} >
                            Upload File
                        </Text>

                    </TouchableOpacity>
                </View>




            </View>
        </SafeAreaView >);
}

export default UploadFileComponent


const styles = StyleSheet.create({

})
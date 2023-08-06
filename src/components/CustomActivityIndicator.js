import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Platform,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';


const CustomActivityIndicator = ({
  isLoading,
  key,
  loaderText,
  viewStyle,
  showText,
}) => {
  var _sizeString

  if (Platform.OS === 'android') {
    _sizeString = 'large';
  } else {
    _sizeString = 'small';
  }

  const { container, insideViewIOS, insideViewAndroid, commonInsideView } = styles;
  return (
    <Modal
      key={key}
      transparent={true}
      visible={isLoading}
      animationType="none"
      deviceWidth={1}
      deviceHeight={1}  >
      <View style={[container]}>
        {Platform.OS === 'android' ? (
          <View style={[commonInsideView, insideViewAndroid, viewStyle]}>
            <ActivityIndicator color="#008fff" size={_sizeString} />
            {showText === true ? (
              <Text style={{ fontFamily: 'billy', fontSize: 22, paddingTop: 3 }}>{loaderText}</Text>
            ) : null}
          </View>
        ) : (
          <View style={[commonInsideView, insideViewIOS]}>
            <ActivityIndicator color="black" size={_sizeString} />
            {showText === true ? (
              <Text style={{ fontFamily: 'billy', fontSize: 22, paddingTop: 3, marginLeft: 5, marginRight: 5 }}>
                {loaderText}
              </Text>
            ) : null}
          </View>
        )}
      </View>
    </Modal>
  );

}

export default CustomActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    alignItems: 'center',
  },
  insideViewIOS: {
    height: 80,
    width: 80,
    borderRadius: 5,
  },
  insideViewAndroid: {
    height: 55,
    width: 55,
    borderRadius: 25,
  },
  commonInsideView: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

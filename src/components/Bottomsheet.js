import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';


const BottomeSheet = ({ height, refRBSheet, children, onClose, onOpen, stictOpen, closeOnPressBack, heightmax = 0 }) => {

    return (
        <RBSheet
            ref={refRBSheet}
            height={stictOpen === false ? height + heightmax : height + 80 + heightmax}
            closeOnDragDown={stictOpen === false ? stictOpen : true}
            closeOnPressMask={true}
            customStyles={{
                container: {
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50
                },
            }}
            onClose={onClose}
            onOpen={onOpen}
            closeOnPressBack={closeOnPressBack}
        >
            {children}
        </RBSheet>
    );
}


export default BottomeSheet;
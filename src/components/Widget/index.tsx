import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Options } from '../Options';
import { Form } from '../Form';

import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';

import { styles } from './styles'
import { Success } from '../Success';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSend, setFeedbackSend] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleResertFeedback() {
    setFeedbackSend(false);
    setFeedbackType(null);
  }

  function handleFeedbackSend() {
    setFeedbackSend(true)
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <Ionicons 
          name="chatbubble-ellipses-outline" 
          size={24} 
          color={theme.colors.text_on_brand_color} 
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 290]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >

        {
          feedbackSend 
            ? 
              <Success 
                onSendAnotherFeedback={handleResertFeedback}
              />
            :
              <>
                { 
                  feedbackType 
                    ? <Form 
                      feedbackType={feedbackType}
                      onFeedbackCanceled={handleResertFeedback}
                      onFeedbackSend={handleFeedbackSend} 
                    /> 
                    : <Options onFeedbackTypeChange={setFeedbackType} />
                  }
              </>
        }
      </BottomSheet>
    </>
  )
}

export default gestureHandlerRootHOC(Widget);
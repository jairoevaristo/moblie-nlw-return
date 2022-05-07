import React, { useState } from 'react';
import { 
  View, 
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { styles } from './styles';
import { theme } from '../../theme';
import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshortButton } from '../ScreenshortButton';
import { Button } from '../Button';
import { api } from '../../libs/api';

type Props = {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSend: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSend }: Props) {
  const [screenshort, setScreenshort] = useState<string | null>(null);
  const [isFeedbackSend, setIsFeedbackSend] = useState(false);
  const [comment, setComment] = useState('');

  const feedbackInfo = feedbackTypes[feedbackType];

  function handleScreenshort() {
    captureScreen({
      format: 'png',
      quality: 0.8
    })
    .then(uri => setScreenshort(uri))
    .catch(err => console.log(err))
  }

  function handleScreenshorRemove() {
    setScreenshort(null)
  }

  async function handleSendFeedback() {
    if (isFeedbackSend) {
      return;
    }

    setIsFeedbackSend(true);
    const screenshortBase64 = screenshort && await FileSystem.readAsStringAsync(screenshort, { encoding: 'base64' });

    try {
      await api.post('/feedbacks', { 
        comment, 
        type: feedbackType, 
        screenshort: `data:image/png;base64, ${screenshortBase64}`
      });

      onFeedbackSend();
    } catch (error) {
      console.log(error);
    } 
    finally{
      setIsFeedbackSend(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onFeedbackCanceled}
        >
        <AntDesign 
          name="arrowleft" 
          size={24} 
          color={theme.colors.text_secondary}
        />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image 
            source={feedbackInfo.image}
            style={styles.image} 
          />
          <Text style={styles.titleText}>
            {feedbackInfo.title}
          </Text>
        </View>
      </View>

      <TextInput 
        multiline
        style={styles.input}
        placeholderTextColor={theme.colors.text_secondary}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshortButton 
          onRemoveShot={handleScreenshorRemove}
          onTakeShot={handleScreenshort}
          screenshort={screenshort}
        />
        <Button 
          isLoading={isFeedbackSend}
          disabled={isFeedbackSend}
          onPress={handleSendFeedback}
        />
      </View>
    </View>
  )
}
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import successImg from '../../assets/success.png';
import { Copyright } from '../Copyright';

import { styles } from './styles';

type Props = {
  onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image 
        source={successImg}
        style={styles.image}
      />

      <Text style={styles.title}>
        Agradeçemos o feedback
      </Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={onSendAnotherFeedback}
      >
        <Text style={styles.buttonTitle}>
          Quero enviar outro
        </Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  )
}
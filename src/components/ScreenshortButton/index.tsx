import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

import { styles } from './styles';
import { theme } from '../../theme';

type Props = {
  screenshort: string | null;
  onTakeShot: () => void;
  onRemoveShot: () => void;
}

export function ScreenshortButton({ screenshort, onRemoveShot, onTakeShot }: Props) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={screenshort ? onRemoveShot : onTakeShot }
    >
      {
        screenshort 
        ?
          <View>
            <Image 
              style={styles.image}
              source={{ uri: screenshort }}
            />
          <Feather 
            name="trash-2" 
            size={22} 
            color={theme.colors.text_secondary}
            style={styles.removeIcon}
            />  
            </View>
        :
          <Feather 
            name="camera" 
            size={24} 
            color={theme.colors.text_secondary} 
          />
      }
    </TouchableOpacity>
  )
}
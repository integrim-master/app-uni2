import BodyText from '@/components/shared/BodyText';
import TitleText from '@/components/shared/TitleText';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import SuggestionItem from '../components/SugestionsItems';

type HeaderSectionProps = {
  fullName: string;
};

const HeaderSection: React.FC<HeaderSectionProps> = ({ fullName }) => {
  const { colors, isDark } = useTheme();
  
  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.card }]}> 
      <View style={styles.profileSection}> 
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start' }}>
          <TitleText style={{ color: colors.text }}>
            Hola, <Text style={[styles.primaryText, { color: colors.primaryDark }]}>{fullName}</Text> 
          </TitleText>
          <View
            style={{
              backgroundColor: isDark ? colors.card : colors.card,
              borderRadius: 99,
              padding: 5,
            }}
          >
            <Ionicons name="notifications-outline" size={30} color={colors.primary} />
          </View>
        </View>
        <View style={ styles.suggestionsContainer }> 
          <BodyText style={{ fontWeight: 500, color: colors.text }}>Tratamientos recomendados:</BodyText>
          <FlatList
            data={[
              { id: '1', title: 'Sugerencia 1' },
              { id: '2', title: 'Sugerencia 2' },
              { id: '3', title: 'Sugerencia 3' },
              { id: '4', title: 'Sugerencia 3' },
              { id: '5', title: 'Sugerencia 3' },
              { id: '8', title: 'Sugerencia 3' },
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <SuggestionItem title={item.title} />}
            keyExtractor={(item) => item.id}
            style={styles.suggestionsList}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 220,
    paddingTop: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    overflow: 'hidden',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  profileSection: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  suggestionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  suggestionsList: {},
  primaryText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HeaderSection;

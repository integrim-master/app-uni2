import PrimaryButton from '@/components/shared/PrimaryButton';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { ItemUniqueProps } from '../types/benefits.types';

export default function ItemUnique({
  index,
  dark,
  light,
  transparent,
  data,
  loading,
  onPress,
}: ItemUniqueProps) {
  const { colors } = useTheme();

  const getEstadoConfig = (estado: string) => {
    switch (estado) {
      case 'disponible': 
        return {
          color: colors.successDark ?? colors.success,
          text: 'Disponible',
          icon: 'check-circle',
          bg: `${colors.success}14`,
          textColor: colors.textDark ?? colors.text,
        };
      case 'usado': 
        return {
          color: colors.dangerDark ?? colors.danger,
          text: 'Usado',
          icon:  'cancel',
          bg: `${colors.danger}12`,
          textColor: colors.textSecondary,
        };
      case 'expirado':
        return {
          color: colors.warningDark ?? colors.warning,
          text: 'Expirado',
          icon: 'schedule',
          bg: `${colors.warning}12`,
          textColor: colors.textSecondary,
        };
      default: 
        return {
          color:  colors.primary,
          text: 'Desconocido',
          icon:  'help',
          bg: `${colors.primary}12`,
          textColor: colors.textSecondary,
        };
    }
  };

  const estadoConfig = getEstadoConfig(data.estado);

  return (
    <Pressable
      onPress={() => onPress?.(data)}
      disabled={loading || data.estado !== 'disponible'}
      style={({ pressed }) => [
        styles. wrapper,
        pressed && { opacity: 0.92, transform: [{ scale: 0.985 }] },
      ]}
      accessibilityLabel={`${data.procedimiento} - ${estadoConfig.text}`}
      accessibilityState={{ disabled: loading || data.estado !== 'disponible' }}
    >
   
      <LinearGradient
        colors={[colors.gradientCardStart, colors.gradientCardEnd]}
        start={{ x: 0.1, y: 2.5 }}
        end={{ x: 0.9, y: 0.9 }}
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            shadowColor: colors.shadow || '#000',
            borderColor: colors.border || '#ddd',
            borderWidth: 2,
          },
        ]}
      >

        <View style={styles.topSection}>
        
          <View style={styles.titleColumn}>
            <Text
              style={[styles.title, { color: colors.text }]}
              numberOfLines={2}
            >
              {data.procedimiento}
            </Text>
            <Text
              style={[styles.desc, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {data.descripcion}
            </Text>
          </View>

          <LinearGradient
            colors={[estadoConfig.bg, `${estadoConfig.color}0A`]}
            style={[styles.estadoBadge, { paddingHorizontal: 8 }]}
            start={[0, 0]}
            end={[1, 0]}
          >
            <MaterialIcons
              name={estadoConfig.icon as any}
              size={14}
              color={estadoConfig.color}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.estadoText, { color: estadoConfig.color }]}>{estadoConfig.text}</Text>
          </LinearGradient>
        </View>

        <View style={styles.perforationWrap}>
          <View
            style={[
              styles. perforationLine,
              { borderColor: colors.border || '#ddd' },
            ]}
          />
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.infoPills}>
            {data. descuento ?  (
              <View
                style={[
                  styles.pill,
                  { backgroundColor: 'rgba(179, 142, 44, 0.12)' },
                ]}
              >
                <MaterialIcons name="percent" size={14} color="#B38E2C" />
                <Text style={[styles.pillText, { color: '#B38E2C' }]}>
                  {data.descuento}% OFF
                </Text>
              </View>
            ) : null}

            {data.valor ? (
              <View
                style={[
                  styles.pill,
                  { backgroundColor: colors.background || '#f9f9f9' },
                ]}
              >
                <MaterialIcons
                  name="attach-money"
                  size={14}
                  color={colors.textSecondary}
                />
                <Text style={[styles. pillText, { color: colors. textSecondary }]}>
                  ${data.valor.toLocaleString()}
                </Text>
              </View>
            ) : null}

            {data.fechaExpiracion ? (
              <View
                style={[
                  styles.pill,
                  { backgroundColor: 'rgba(179, 142, 44, 0.08)' },
                ]}
              >
                <MaterialIcons name="schedule" size={14} color="#B38E2C" />
                <Text style={[styles.pillText, { color: '#B38E2C' }]}>
                  {new Date(data.fechaExpiracion).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.ctaWrap}>
              {loading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : data.estado === 'disponible' ? (
                <PrimaryButton
                  title="Aplicar"
                  onPress={() => onPress?.(data)}
                  style={styles.applyBtn}
                  gradientColors={['#D4AF37', '#F7D67A', '#D4AF37']}
                  icon={<MaterialIcons name="arrow-forward" size={16} color="#fff" />}
                />
              ) : (
              <View style={styles.disabledBtn}>
                <Text
                  style={[styles.disabledText, { color: colors.textSecondary }]}
                >
                  {estadoConfig.text}
                </Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    overflow: 'visible',
    position: 'relative',
    ... Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity:  0.14,
        shadowRadius: 16,
      },
      android:  {
        elevation: 8,
      },
    }),
  },
  notch: {
    position: 'absolute',
    top: '50%',
    marginTop: -14,
    width: 28,
    height: 28,
    borderRadius: 14,
    zIndex: 1,
  },
  notchLeft: {
    left: -14,
  },
  notchRight: {
    right:  -14,
  },


  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 4,
    lineHeight: 22,
  },
  desc:  {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.85,
  },
  estadoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical:  6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    ... Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity:  0.2,
        shadowRadius: 6,
      },
      android:  {
        elevation: 4,
      },
    }),
  },
  estadoText: {
    color: '#fff',
    fontSize:  11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  perforationWrap: {
    marginVertical: 14,
  },
  perforationLine:  {
    borderTopWidth: 1.5,
    borderStyle: 'dashed',
    opacity: 0.35,
  },

  bottomSection:  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  infoPills: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill:  {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical:  6,
    borderRadius:  12,
    gap: 4,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // CTA
  ctaWrap: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
    ... Platform.select({
      ios: {
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android:  {
        elevation: 5,
      },
    }),
  },
  applyText:  {
    color: '#fff',
    fontSize:  14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  disabledBtn: {
    paddingHorizontal: 14,
    paddingVertical:  8,
    borderRadius:  10,
  },
  disabledText:  {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
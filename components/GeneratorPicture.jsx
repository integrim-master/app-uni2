import React from 'react';
import { SvgXml } from 'react-native-svg';

export const ProcedimientoIcon = ({ iconUri, size=40, color="#3d0" }) => {
  if (!iconUri) return null;
  // Reemplaza el color original del SVG con uno personalizado (usa currentColor en el backend si es posible)
  const modifiedSvg = iconUri.replace(/fill="[^"]*"/g, `fill="${color}"`);

  return <SvgXml xml={modifiedSvg} width={size} height={size} />;
};

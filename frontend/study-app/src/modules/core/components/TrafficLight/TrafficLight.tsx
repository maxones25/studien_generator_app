import React from 'react';
import { Box, Paper, useTheme } from '@mui/material';

type TrafficLightProps = {
  status: 'red' | 'yellow' | 'green';
};

const TrafficLight: React.FC<TrafficLightProps> = ({ status }) => {
  const theme = useTheme();

  const lightColors = {
    red: status === 'red' ? theme.palette.error.main : 'gray',
    yellow: status === 'yellow' ? theme.palette.warning.main : 'gray',
    green: status === 'green' ? theme.palette.success.main : 'gray'
  };

  return (
    <Paper elevation={3} style={{ 
      backgroundColor: '#333', 
      display: 'flex', 
      flexDirection: 'row', 
      alignItems: 'center', 
      padding: 2 
    }}>
      <Circle size={20} color={lightColors.red}/>
      <Circle size={20} color={lightColors.yellow}/>
      <Circle size={20} color={lightColors.green}/>
    </Paper>
  );
};

type CircleProps = {
  size: number,
  color: string,
};

const Circle: React.FC<CircleProps> = ({ 
  size,
  color,
}) => {

  return (
    <Box style={{ 
      width: size, 
      height: size, 
      margin: 5, 
      borderRadius: '50%', 
      backgroundColor: color 
    }} />
  )
}

export default TrafficLight;
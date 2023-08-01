import { Button, Column, Text } from '@modules/core/components';
import { FormField } from '@modules/forms/types';
import { useHiit } from '@modules/hiit/hooks';
import { HiitConfig } from '@modules/hiit/types';
import { useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface HiitProps {
  control: Control<FieldValues>;
  componentId: string;
  formFields: FormField[];
  label?: string;
  attributes?: {[x: string]: any};
}

export function Hiit ({
  label,
  control,
  componentId,
  formFields,
  attributes,
}: HiitProps) {
  const { t } = useTranslation();
  const {
    isPlaying,
    phase,
    createPhases,
    setIsPlaying,
    nextPhase,
  } = useHiit();

  const config: HiitConfig = {
    repetitions: attributes?.repetitions ?? 3,
    lowIntensity: attributes?.lowIntensity ?? 5,
    warmUp: attributes?.warmUp ?? 5,
    coolDown: attributes?.coolDown ?? 5,
    highIntensity: attributes?.highIntensity ?? 5,
  }

  useEffect(() => {
    createPhases(config);
  }, [])

  const start: Path<FieldValues> = `${componentId}.${formFields[0].entityFieldId}` as Path<FieldValues>
  const end: Path<FieldValues> = `${componentId}.${formFields[1].entityFieldId}` as Path<FieldValues> 

  return (
    <Column alignItems={'center'}>
      <Text>{label ?? 'Label'}</Text>
      <Controller 
         control={control}
         name={end}
         rules={{
          required: true
        }}
         render={({ field: { onChange }}) => {
          return(
            <CountdownCircleTimer 
              isPlaying={isPlaying}
              duration={phase?.time ?? 10}
              colors={["#F7B801", "#A30000", "#A30000"]}
              colorsTime={[5, 2, 0]}
              onComplete={() => {
                if (!nextPhase()) {
                  setIsPlaying(false);
                  onChange(new Date() as PathValue<FieldValues, Path<FieldValues>>);
                } else {
                  return ({ shouldRepeat: true })
                }
              }}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          )
        }}
      />
      <Text>{phase?.name ?? 'Label'}</Text>
      <Text>{phase?.description ?? 'Label'}</Text>
      {!isPlaying && (
        <Controller 
          control={control}
          name={start}
          rules={{
            required: true,
          }}
          render={({ field: { onChange }, }) => {
            return(
              <Button 
                testId='hiit-start-done-button'
                onClick={() => {
                  setIsPlaying(true)
                  onChange(new Date() as PathValue<FieldValues, Path<FieldValues>>)}
                } 
              >
                {t('start')}
              </Button>
            )
          }}
        />
      )}
    </Column>
  );
};
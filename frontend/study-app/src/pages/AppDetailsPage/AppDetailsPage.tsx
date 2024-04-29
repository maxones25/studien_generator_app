import { Page, Text } from '@modules/core/components';
import React from 'react';

export interface AppDetailsPageProps {}

const AppDetailsPage : React.FC<AppDetailsPageProps>= ({
  
}) => {
  return (
    <Page padding={2} testId='App Details Page'>
    <div style={{  textAlign: 'center' }}>
      <Text>
        <h2><a style={{color: "black"}} target="_blank" href="https://gitlab.zi.local/sucht/studien_generator_app"> 
          Studien Generator App
          </a></h2> by <br/><br/>
        <a target="_blank" href="https://github.com/kaimanni">
          Kai Mannweiler,&nbsp;
        </a>
        <a target="_blank" href="https://github.com/maxones25">
          Maximilian Stock, <br/>
        </a> Gordon Feld, Sabine Vollstädt-Klein, Karen Ersche, 
        Oliver Hummel, Christoph Giess, Sarah Gerhardt, Michaela Kroth, CIMH Mannheim <br/><br/>
        is licensed under 
        <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
           target="_blank"
           rel="noopener noreferrer"
           style={{ display: 'inline-block', textDecoration: 'none' }}>
          CC BY-NC-SA 4.0
          <img style={{ height: '22px', marginLeft: '3px', verticalAlign: 'text-bottom' }}
               alt="CC"
               src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" />
          <img style={{ height: '22px', marginLeft: '3px', verticalAlign: 'text-bottom' }}
               alt="BY"
               src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" />
          <img style={{ height: '22px', marginLeft: '3px', verticalAlign: 'text-bottom' }}
               alt="NC"
               src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" />
          <img style={{ height: '22px', marginLeft: '3px', verticalAlign: 'text-bottom' }}
               alt="SA"
               src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" />
        </a>
      </Text>
    </div>
    </Page>
  );
};

export default AppDetailsPage
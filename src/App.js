import React, { useState, useContext } from 'react';
import './App.css';

import { withTranslation, Trans } from 'react-i18next'
import { DirectionContext } from './directioncontext';
import { DIRECTIONS } from 'react-with-direction/dist/constants';
import DirectionProvider from 'react-with-direction/dist/DirectionProvider';

function App(props) {
  const [languageState, setLanguageState] = useState({ value: 'en' });
  const { state, dispatch } = useContext(DirectionContext);

  const onLanguageHandle = (event) => {
    let newLang = event.target.value;
    setLanguageState({ ...languageState, value: newLang })
    props.i18n.changeLanguage(newLang)

    dispatch({
      type: 'CHANGE_DIRECTION',
      payload: { direction: newLang === 'ar' ? DIRECTIONS.RTL : DIRECTIONS.LTR}
    });
  }

  const renderRadioButtons = () => {
    return (<div>
      <input
        checked={languageState.value === 'en'}
        name="language"
        onChange={(e) => onLanguageHandle(e)}
        value="en"
        type="radio" />English &nbsp;
      <input
        name="language"
        value="ar"
        checked={languageState.value === 'ar'}
        type="radio"
        onChange={(e) => onLanguageHandle(e)}
      />Arabic
    </div>)
  }

  const { t } = props
  return (
    <DirectionProvider direction={state.direction}>
      <div className="App">
        {renderRadioButtons()}
        <h1><Trans>Paragraph</Trans></h1>
        <table>
          <tbody>
            <tr>
              <td style={{ width: '20%' }}>
                {t('author.title')}
              </td>
              <td style={{ width: '5%' }}>:</td>
              <td style={{ width: '75%' }}>
                {t('author.value')}
              </td>
            </tr>
            <tr>
              <td style={{ width: '20%' }}>
                {t('description.title')}
              </td>
              <td style={{ width: '5%' }}>:</td>
              <td style={{ width: '75%' }}>
                {t('description.value')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DirectionProvider>
  );

}

export default withTranslation()(App);

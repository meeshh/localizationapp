import React, { useState } from 'react';
import './App.css';

import { withTranslation, Trans } from 'react-i18next'

function App(props) {
  const [state, setState] = useState({ value: 'en' })

  const onLanguageHandle = (event) => {
    let newLang = event.target.value;
    setState({ value: newLang })
    props.i18n.changeLanguage(newLang)
  }

  const renderRadioButtons = () => {
    return (<div>
      <input
        checked={state.value === 'en'}
        name="language"
        onChange={(e) => onLanguageHandle(e)}
        value="en"
        type="radio" />English &nbsp;
      <input
        name="language"
        value="ar"
        checked={state.value === 'ar'}
        type="radio"
        onChange={(e) => onLanguageHandle(e)}
      />Arabic
    </div>)
  }

  const { t } = props
  return (
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
  );

}

export default withTranslation()(App);

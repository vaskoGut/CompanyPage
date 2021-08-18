import { useEffect, useState, useContext } from 'react';
import { x } from '@xstyled/styled-components';
import { Button } from '@/components/styles';
import Link from '@/components/Link';
import OptionsContext from '../../context/OptionsProvider';

const CookieBar = () => {
  const { onCookieAccept } = useContext(OptionsContext);

  const [consent, setConsent] = useState(true);
  const [types, setTypes] = useState({
    functional: true,
    analytical: false,
    tracking: false,
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');

    setConsent(cookieConsent);
  }, []);

  /**
   * Set cookies with values for consent validation
   */
  const accept = (e) => {
    e.preventDefault();

    const acceptedTypes = Object.keys(types).filter((i) => types[i] == true);
    localStorage.setItem('cookieConsent', true);
    localStorage.setItem('cookieAcceptedTypes', acceptedTypes.join(','));

    setConsent(true);

    if (onCookieAccept) onCookieAccept();
  };

  /**
   * Update state upon change
   */
  const onCheck = (e) => {
    const type = e.target.name;
    const newState = { ...types };

    newState[type] = e.target.checked;

    setTypes(newState);
  };

  return (
    <x.div
      visibility={consent ? 'hidden' : 'visible'}
      p={20}
      w="100%"
      boxShadow="up"
      left={0}
      bottom={0}
      color="light"
      position="fixed"
      bg="dark-500"
    >
      <form onSubmit={(e) => accept(e)}>
        <x.div display="flex" alignItems="center">
          <x.div display="flex" flexGrow={1}>
            <x.div>
              Deze website maakt gebruik van cookies. Lees{' '}
              <Link url="https://www.google.com/" target="_blank">
                hier
              </Link>{' '}
              meer over ons cookie beleid en lees hier ons privacy statement.
            </x.div>
            <x.div pl={20}>
              <x.label display="flex" className={`${types.tracking ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  onChange={(e) => onCheck(e)}
                  name="tracking"
                  style={{ marginTop: '3px' }}
                  checked={types.tracking}
                />
                <x.span mr={2} className="checkbox" /> Tracking
              </x.label>
            </x.div>
          </x.div>
          <x.div flex="none">
            <Button type="submit" transitionDuration={150}>
              Accepteren
            </Button>
          </x.div>
        </x.div>
      </form>
    </x.div>
  );
};

export default CookieBar;

import React, { useState, useEffect } from 'react';
import { Shell, ConfigProvider } from '@alifd/next';
import PageNav from './components/PageNav';
import Logo from './components/Logo';
import Footer from './components/Footer';

import axios from 'axios'

(function() {
  const throttle = function(type, name, obj = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  if (typeof window !== 'undefined') {
    throttle('resize', 'optimizedResize');
  }
})();

export default function BasicLayout({ children }) {
  const getDevice = width => {
    const isPhone =
      typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    }
    if (width < 1280 && width > 680) {
      return 'tablet';
    }
    return 'desktop';
  };

  const [device, setDevice] = useState(getDevice(NaN));

  if (typeof window !== 'undefined') {
    window.addEventListener('optimizedResize', e => {
      const deviceWidth = (e && e.target && e.target.innerWidth) || NaN;
      setDevice(getDevice(deviceWidth));
    });
  }

  useEffect(() => {
    axios.get('/api/rmsportal/ODDwqcDFTLAguOvWEolX.json')
  }, [])

  return (
    <ConfigProvider device={device}>
      <Shell
        type="brand"
        style={{
          minHeight: '100vh',
        }}
      >
        <Shell.Branding>
          <Logo
            image="https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png"
            text="Logo"
          />
        </Shell.Branding>
        <Shell.Navigation
          direction="hoz"
          style={{
            marginRight: 10,
          }}
        />
        <Shell.Action/>
        <Shell.Navigation>
          <PageNav />
        </Shell.Navigation>

        <Shell.Content>{children}</Shell.Content>
        <Shell.Footer>
          <Footer />
        </Shell.Footer>
      </Shell>
    </ConfigProvider>
  );
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import publicIP from 'react-native-public-ip';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [ip, setIP] = React.useState(null);
  const [subeNo, setSubeNo] = useState(0);
  const [dahiliNo, setDahiliNo] = useState(0);

  //LOGIN sorgusu
  const login = (UserSube, UserName, UserPass) => {
    // logCreate();
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/Login_Query/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          UserSube,
          UserName,
          UserPass,
          ip,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
         console.log(userInfo);
        setUserInfo(userInfo);
        setDahiliNo(userInfo.X_DAHILI_NO);
        setSubeNo(userInfo.X_DAHILI_SUBE);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('userInfoTwo', userInfo);
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  //Bu context çağrılır çağrılmaz çalışacak fonksiyon.Kullanıcı 
  //bir kere üyelik girişi yapıp uygulamayı kapattı.Tekrar girdiğinde üye girişi istemeyeceğimiz için bu fonksiyon çalışıyor.
  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      // console.log(`is logged in error ${e}`);
    }
  };

  //Account sayfasında oturumu kapat denildiğinde çalışıyor.Oturum kapatılınca log tutuyor.
  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}//LoginLog_Save/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          X_SUBEID: '9341001',
          X_DIS_IP: '212.252.119.1499', //Cihazın Dış İp Adresi
          X_PCADI: '1', //Cihazın Adı
          X_SESSIONID: '1', //Asp.net Session Id, Mobil cihazlarda mümkünse aygıt benzersiz numarası
          X_GELDIGIADRES: '1', //Daha önce geldiği adres var ise url adresi
          X_TARAYICIADI: '1', //Chrome, Firefox, Edge
          X_PLATFORM: '1', //Bilgisayar,Mobil,Tablet
          X_DIL: '1', //Türkçe, İngilizce veya Kısaltmaları
          X_GIRISDURUM: '1', //Giriş yaparsa "Giriş Yaptı", Çıkış yaparsa "Çıkış Yaptı"
          X_USERID: '253',
        },
      )
      .then(res => {
        //  console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        //  console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Aşağıdaki fetchler buradan kopyalanıp ilgili sayfalarda kullanılabilir.URLleri doğru.AuthContextle bi ilgileri yok.

  //DASHBOARD
  const getDashboard = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/DashCallIst/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          subeNo,
          dahiliNo,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  //ÇAĞRI
  //Müşteri veya Dahili Bilgisi Sorgulama
  const costumerInternalInfoQuery = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/DashCallIst/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          subeNo,
          dahiliNo,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  //Transfer Dahili Listesi
  const TransferInternalList = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/DashCallIst/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          subeNo,
          dahiliNo,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  //MEşGULİYET PANOSU
  //Dahili Grup Listesi
  const InternalGroupList = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/DashCallIst/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          subeNo,
          dahiliNo,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };
  //Dahili Listesi
  const InternalList = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/Busyboard/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          subeNo,
          dahiliNo,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
        return JSON.stringify(userInfo);
   
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        
      });
  };

  //HESABIM
  //Cevapsız Çağrılar
  const missedCalls = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/DashCallIst/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          subeNo,
          dahiliNo,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  //Cevapsız Arama Kaydet
  const missedCallSave = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/DashCallIst/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          subeNo,
          dahiliNo,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  //Çağrı Raporu
  const callReport = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/DashCallIst/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          subeNo,
          dahiliNo,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  //Kuyruğa Dahil Ol
  const joinQueue = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/DashCallIst/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          subeNo,
          dahiliNo,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };
  //Kuyruktan ayrıl
  const leaveQueue = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/DashCallIst/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          subeNo,
          dahiliNo,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  //Yönlendirme Dahili Listesi
  const routeIntervalList = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/DashCallIst/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          subeNo,
          dahiliNo,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  //Yönlendirme kaydet
  const routeSave = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/DashCallIst/91007771DH2ISIXRX8N40OBIJ6AN07FC8GZFVYZ3Q1CZ8QBUMDPCW93GXBOP06UIWKKKS30XL98VX2NO7Y9SW4ZAS9C9SLA1FNRPT27WM6RJEPHCAL310EZAWGNKVN98QRNLVFN4`,
        {
          subeNo,
          dahiliNo,
        },
      )
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    //GET IP
    const getIP = () => {
      publicIP()
        .then(ip => {
          // console.log(ip);
          setIP(ip);
          // '47.122.71.234'
        })
        .catch(error => {
          // console.log(error);
          // 'Unable to get IP address.'
        });
    };
    getIP();
    isLoggedIn();

    //
  });

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

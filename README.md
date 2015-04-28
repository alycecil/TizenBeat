Tizen 2.2 Heart Rate Monitor / HRM API
Is well hidden with reason. It rarely gives a result.
Have you ran the built in, heart rate app? 
Then you know its truly hit or miss if the little green light will do its job. 
But now you too can see the 'glory' that is HRM.

Its nice and hidden inside the motion api (which also is poorly/not documented)

window.webapis.motion.start("HRM", onchangedCB);
window.webapis.motion.stop("HRM");

Most of the time it will feed you back a {"heartRate":0,"rRInterval":0}

Add the following to your config.xml if not stealing mine:
    <tizen:privilege name="http://developer.samsung.com/privilege/healthinfo"/>
    <tizen:privilege name="http://developer.samsung.com/privilege/medicalinfo"/>
    
Optionally, add the required feature
    <feature name="http://developer.samsung.com/tizen/feature/heart_rate_monitor"/>
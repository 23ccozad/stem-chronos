# stem-chronos

STEM Chronos is a Google Chrome extension helping students at the Downingtown STEM Academy easily access their daily schedule.

The extension can be previewed and downloaded for free from the Chrome Web Store: https://chrome.google.com/webstore/detail/stem-chronos/gpmmebokjcjjnjkljpjliaepcchkmbda

<b>How STEM Chronos Works</b>

Our Chrome Extension is only the front-end of the Chronos system. Each night before school, one of the developers uses a back-end interface to enter in the schedule information for the next day. The back-end interface translate that data into an XML file using PHP. The STEM Chronos extension uses XMLHttpRequests to access these XML files, and JavaScript/JQuery code within the extension parses that data to be displayed through the front-end interface. HTML and CSS was used to develop the front-end interface.

<b>Ongoing Work</b>

STEM Chronos has come a long way since its inception during April 2018. It started as a primitive Chrome extension with a lacking front-end interface and little strucutre in place to store schedule data. Today, it's interface is colorful and intutive, with a set strucutre for data storage on the back-end.

However, there are two challenges we still face with the extension. When the extension was first launched to the student body, we discovered that the Wi-Fi network at the Downingtown STEM Academy is extremley slow, and it would regularly take 10 to 15 seconds for the extension to load the schedule. The biggest contributor to the long loading times was the retrieve the XML file with schedule information. To resolve this issue, we allowed the extension to cache the XML file. At this point, the extension is only slow when Chrome or the user decides to refresh the XML file in the cache, which is still somewhat of an issue. This also limits us from making schedule changes on the fly. For example, if a two-hour early dismissal is announced at 10 AM due to an impending snowstorm (this doesn't happen often, but it's possible), the extension will not update the schedule until the cache is refreshed.

Another challenge we face is support for daily schedules for teachers that teach across the "schedule line". That is, if a teacher teaches some classes for seniors or juniors and some classes for freshmen or sophomores, we currently have no way to show their schedule. We understand that this only affects their lunch periods, in terms of the times of classes which they teach and we know how to solve this issue, but it will be a cumbersome and time-consuming fix, only adding to the 2,500 lines of code that comprise the front-end and back-end of Chronos.

<b>Our GitHub Repo</b>

I initially developed this extension on my school-issued Mac, and I uploaded all of my front-end work into the folder "STEM-Chronos" in the repo. Within that folder is everything I have built for the STEM Chronos front-end, from the GIFs that are displayed on snow days to the packages uploaded to the Chrome Web Store for distribution. What I have not included is any back-end files or information, since parts of it are secure and only to be accessed or seen by the developers. I run the back-end interface and XML files from my personal website.

<b>Thank You</b>

Thank You to all of the students and staff who have downloaded this extension. It's been extremley gratifying to see how a combination of my keystrokes has created a system integral to the school community.

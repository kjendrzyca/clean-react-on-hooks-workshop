// ISP

function Picture({
  pictureData,
  onClick,
  onDoubleClick,
  onRouteChange,
  borderOptions,
  gravatarSettings,
  sticky,
  filter,
  circle,
  wrapperComponent,
}) {
  // a lot of logic here
  // render ...
}

// Solution:
function ProfilePicture({
  pictureData,
  onClick,
  onDoubleClick,
  gravatarSettings,
  wrapperComponent,
}) {
  // some logic here
  return <div>
    {/* maybe some wrappers and event hanlers here */}
    <Picture pictureData={pictureData} />
  </div>
}

function Avatar({
  pictureData,
  borderOptions,
  sticky,
  filter,
  circle,
}) {
  // some logic here
  return <div>
    {/* maybe some wrappers and event hanlers here */}
    <Picture pictureData={pictureData} />
  </div>
}

function NavigationPicture({
  pictureData,
  onRouteChange,
  wrapperComponent,
}) {
  // some logic here
  return <div>
    {/* maybe some wrappers and event hanlers here */}
    <Picture pictureData={pictureData} />
  </div>
}

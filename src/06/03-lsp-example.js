// 💡 LSP

function SomeComponent() {
  return (
    <PictureDataProvider>
      {pictureData => (
        <>
          <Topbar>
            <ProfilePicture pictureData={pictureData} />
          </Topbar>

          <LeftBar>
            <Avatar pictureData={pictureData} />
          </LeftBar>

          <Menu>
            <NavigationPicture pictureData={pictureData} />
          </Menu>
        </>
      )}
    </PictureDataProvider>
  )
}

ProfilePicture.propTypes = {
  pictureData: PropTypes.shape({
    url: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  })
}
Avatar.propTypes = {
  pictureData: PropTypes.shape({
    url: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  })
}
NavigationPicture.propTypes = {
  pictureData: PropTypes.shape({
    url: PropTypes.shape({ // <- WTF
      pathName: PropTypes.string.isRequired,
      queryString: PropTypes.string,
    }).isRequired,
    size: PropTypes.number.isRequired,
  })
}


!macro customHeader
   ;!system "echo '' > ${BUILD_RESOURCES_DIR}/customHeader"
!macroend

!macro preInit
  ; This macro is inserted at the beginning of the NSIS .OnInit callback
  ;!system "echo '' > ${BUILD_RESOURCES_DIR}/preInit"
!macroend

!macro customInit
  ;!system "echo '' > ${BUILD_RESOURCES_DIR}/customInit"
!macroend

!macro customInstall
  ;!system "echo '' > ${BUILD_RESOURCES_DIR}/customInstall"  
  CreateShortCut "$SMSTARTUP\Onemark.lnk" "$INSTDIR\Onemark.exe" "--run-api"
!macroend

!macro customUnInit
  ;!system "echo '' > ${BUILD_RESOURCES_DIR}/customUnInit"  
  Delete "$SMSTARTUP\Onemark.lnk"
!macroend
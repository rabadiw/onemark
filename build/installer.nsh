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
  CreateShortCut "$SMSTARTUP\Onemark.lnk" "$INSTDIR\Onemark.exe" "--start=api"
  WriteRegStr HKCU "Software\Google\Chrome\NativeMessagingHosts\com.waelrabadi.onemark" '' '$INSTDIR\manifest-nmh.json'
  ExecShell "" "$SMSTARTUP\Onemark.lnk"
!macroend

!macro customUnInit
  ;!system "echo '' > ${BUILD_RESOURCES_DIR}/customUnInit"  
  Delete "$SMSTARTUP\Onemark.lnk"
  DeleteRegKey HKCU "Software\Google\Chrome\NativeMessagingHosts\com.waelrabadi.onemark"
!macroend
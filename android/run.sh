#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.bluecots.wallet/host.exp.exponent.MainActivity

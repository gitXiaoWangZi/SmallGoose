/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import "RCTHotUpdate.h"
#import <SSZipArchive.h>
#import <AFNetworking.h>

@interface AppDelegate()<SSZipArchiveDelegate,RCTBridgeDelegate>

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:[[RCTBridge alloc] initWithDelegate:self launchOptions:nil] moduleName:@"SmallGoose" initialProperties:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  
  [self dealWithVersion];
  return YES;
}

#pragma RCTBridgeDelegate
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge{
  NSURL *jsCodeLocation;
  //取得沙盒目录
  NSString *localPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
  //要检查的文件目录
  NSString *filePath = [localPath stringByAppendingPathComponent:@"bundle/index.ios.jsbundle"];
  NSFileManager *fileManager = [NSFileManager defaultManager];
  if ([fileManager fileExistsAtPath:filePath]) {
    NSString *newUrl = [NSString stringWithFormat:@"file://%@",filePath];
    jsCodeLocation = [NSURL URLWithString:newUrl];
    NSLog(@"文件存在 %@-------%@",newUrl,jsCodeLocation);
    return jsCodeLocation;
  }else{
    //原来的jsCodeLocation
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    return jsCodeLocation;
  }
}

- (void)dealWithVersion{
  AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
  [manager POST:@"http://api.xiaoe.kouzicr.com/billNewIos" parameters:nil progress:nil success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
    NSDictionary *data = (NSDictionary *)responseObject;
    if ([data[@"code"] integerValue] == 200) {
      NSString *version = data[@"data"][@"version"];
      NSString *currentVersion = [[NSUserDefaults standardUserDefaults] objectForKey:@"version"];
      if (!currentVersion) {
        currentVersion = @"0.0";
      }
      if (version && [version floatValue] > [currentVersion floatValue]) {
        [self downNewVersion];
        [[NSUserDefaults standardUserDefaults] setObject:version forKey:@"version"];
      }
    }
  } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
    NSLog(@"失败");
  }];
}

- (void)downNewVersion{
  //1.创建会话管理者
  AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
  
  NSURL *url = [NSURL URLWithString:@"http://api.xiaoe.kouzicr.com/apk/and/bundle.zip"];
  
  NSURLRequest *request = [NSURLRequest requestWithURL:url];
  //2.下载文件
  NSURLSessionTask *download = [manager downloadTaskWithRequest:request progress:^(NSProgress * _Nonnull downloadProgress) {
    //监听下载进度
    //completedUnitCount 已经下载的数据大小
    //totalUnitCount     文件数据的中大小
    NSLog(@"%f",1.0 *downloadProgress.completedUnitCount / downloadProgress.totalUnitCount);
    
  } destination:^NSURL * _Nonnull(NSURL * _Nonnull targetPath, NSURLResponse * _Nonnull response) {
    /**
     * 1:1：请求路径：NSUrl *url = [NSUrl urlWithString:path];从网络请求路径  2：把本地的file文件路径转成url，NSUrl *url = [NSURL fileURLWithPath:fullPath]；
     2：返回值是一个下载文件的路径
     *
     */
    NSString *fullPath = [[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingPathComponent:response.suggestedFilename];
    
    NSLog(@"targetPath:%@",targetPath);
    
    NSLog(@"fullPath:%@",fullPath);
    
    return [NSURL fileURLWithPath:fullPath];
    
  } completionHandler:^(NSURLResponse * _Nonnull response, NSURL * _Nullable filePath, NSError * _Nullable error) {
    /**
     *filePath:下载后文件的保存路径
     */
//    NSLog(@"%@",filePath);
//    NSString *imgFilePath = [filePath path];// 将NSURL转成NSString
    
    NSString *path =  NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).lastObject;
    NSString *filepa = [[filePath absoluteString] substringFromIndex:7];
    [self releaseZipFilesWithUnzipFileAtPath:filepa Destination:path];
  }];
  
  //3.执行Task
  [download resume];
}

// 解压
- (void)releaseZipFilesWithUnzipFileAtPath:(NSString *)zipPath Destination:(NSString *)unzipPath{
  NSError *error;
  if ([SSZipArchive unzipFileAtPath:zipPath toDestination:unzipPath overwrite:YES password:nil error:&error delegate:self]) {
    NSLog(@"success");
    NSLog(@"unzipPath = %@",unzipPath);
    
    
    NSURL *jsCodeLocation;
    //取得沙盒目录
    NSString *localPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    //要检查的文件目录
    NSString *filePath = [localPath stringByAppendingPathComponent:@"bundle/index.ios.jsbundle"];
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if ([fileManager fileExistsAtPath:filePath]) {
      NSString *newUrl = [NSString stringWithFormat:@"file://%@",filePath];
      jsCodeLocation = [NSURL URLWithString:newUrl];
      NSLog(@"文件存在了%@-------%@",newUrl,jsCodeLocation);
      
    }
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"SmallGoose"
                                                 initialProperties:nil
                                                     launchOptions:nil];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
  }else {
    NSLog(@"%@",error);
  }
}
#pragma mark - SSZipArchiveDelegate
- (void)zipArchiveWillUnzipArchiveAtPath:(NSString *)path zipInfo:(unz_global_info)zipInfo {
  NSLog(@"将要解压。");
}
- (void)zipArchiveDidUnzipArchiveAtPath:(NSString *)path zipInfo:(unz_global_info)zipInfo unzippedPath:(NSString *)unzippedPath{
  NSLog(@"解压完成！");
}

-(NSString *)getWANIP
{
  
  //通过淘宝的服务来定位WAN的IP，否则获取路由IP没什么用
  NSURL *ipURL = [NSURL URLWithString:@"http://ip.taobao.com/service/getIpInfo.php?ip=myip"];
  NSData *data = [NSData dataWithContentsOfURL:ipURL];
  NSDictionary *ipDic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil]; 
  NSString *ipStr = nil;
  if (ipDic && [ipDic[@"code"] integerValue] == 0) { //获取成功
    ipStr = ipDic[@"data"][@"country"];
  }
  return (ipStr ? ipStr : @"");
}

@end

function undersample_fish_signal
tfish=load('C:\Users\aa4658\Downloads\fish_waveform_04.mat');

lens = 1:length(tfish.A);
fs = 1/tfish.Tinterval;
figure;plot(lens*tfish.Tinterval,tfish.A,'*');
title(sprintf('Original samples | fs = %.0f kHz',fs/1e3));
xlabel('Time [s]'); ylabel('Amplitude (au)');
axis([0 5e-3 -.1 .1])
grid;

undersample_by = 90;
figure;plot(lens(1:undersample_by:length(tfish.A))*tfish.Tinterval,tfish.A(1:undersample_by:length(tfish.A)),'*')
title(sprintf('Undersampled x90 | fs = %.0f kHz',fs/1e3/undersample_by));
xlabel('Time [s]'); ylabel('Amplitude (au)');
axis([0 5e-3 -.1 .1]);
grid;

undersample_by = round(fs/10e3);
figure;plot(lens(1:undersample_by:length(tfish.A))*tfish.Tinterval,tfish.A(1:undersample_by:length(tfish.A)),'-*')
title(sprintf('Undersampled x%d | fs = %.0f kHz',undersample_by,fs/1e3/undersample_by));
xlabel('Time [s]'); ylabel('Amplitude (au)');
axis([0 5e-3 -.1 .1]);
grid;


% recObj = audiorecorder
%  disp('Start speaking.')
% recordblocking(recObj, 5);
% disp('End of Recording.');
return
;(function($) {
  
  const SO_LOW3 = 0x2b;
  const RA_LOW3 = 0x2d;
  const SI_LOW3 = 0x2f;
  const DO_LOW2 = 0x30;
  const RE_LOW2 = 0x32;
  const MI_LOW2 = 0x34;
  const FA_LOW2 = 0x35;
  const FAS_LOW2 = 0x36;
  const SO_LOW2 = 0x37;
  const SOS_LOW2 = 0x38;
  const RA_LOW2 = 0x39;
  const SIF_LOW2 = 0x3a;
  const SI_LOW2 = 0x3b;
  const DO_LOW = 0x3c;
  const DOS_LOW = 0x3d;
  const REF_LOW = 0x3d;
  const RE_LOW = 0x3e;
  const MIF_LOW = 0x3f;
  const MI_LOW = 0x40;
  const FA_LOW = 0x41;
  const SOF_LOW = 0x42;
  const SO_LOW = 0x43;
  const SOS_LOW = 0x44;
  const RA_LOW = 0x45;
  const SIF_LOW = 0x46;
  const SI_LOW = 0x47;
  const DO_BASE = 0x48;
  const REF_BASE = 0x49;
  const RE_BASE = 0x4a;
  const MI_BASE = 0x4c;
  const FA_BASE = 0x4d;
  const FAS_BASE = 0x4e;
  const SO_BASE = 0x4f;
  const SOS_BASE = 0x50;
  const RAF_BASE = 0x50;
  const RA_BASE = 0x51;
  const RAS_BASE = 0x52;
  const SIF_BASE = 0x52;
  const SI_BASE = 0x53;
  const DO_HIGH = 0x54;
  const DOS_HIGH = 0x55;
  const REF_HIGH = 0x55;
  const RE_HIGH = 0x56;
  const RES_HIGH = 0x57;
  const MI_HIGH = 0x58;
  const FA_HIGH = 0x59;
  const SOF_HIGH = 0x5a;
  const SO_HIGH = 0x5b;
  const RA_HIGH = 0x5d;
  const SIF_HIGH = 0x5e;
  const SI_HIGH = 0x5f;
  const DO_HIGH2 = 0x60;
  const RE_HIGH2 = 0x62;
  const MI_HIGH2 = 0x64;
  const FA_HIGH2 = 0x65;
  
  var MusicStart = function(element) {
    this.element = element;
    this.m = null;
    this.outputs = null;
    this.initialize();
  };
  
  MusicStart.prototype = {
    initialize: function() {
      navigator.requestMIDIAccess().then($.proxy(this.success, this), this.failure);
      this.element.on('click', $.proxy(this.start, this));
    },
    
    success: function(midiAccess) {
      this.m = midiAccess;
      this.outputs = this.m.outputs();
    },
    
    failure: function(error) {
      alert("Cannot use Web MIDI API!");
    },
    
    start: function() {
      var self = this;
      var totalInterval = 0;
      var toneUpper = $("#tone-upper-selector").val() || 1;
      var toneLower = $("#tone-lower-selector").val() || 33;
      self.baseTempo = 1000 * 60 / $("#tempo").val() || 500;

      this.startUpper(self, totalInterval, toneUpper);
      this.startLower(self, totalInterval, toneLower);
    },
      
    startUpper: function(self, totalInterval, tone) {
      // 10
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo*3/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo*3/4);
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/4);
      
      // 11
      this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo);
      
      // 12
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_HIGH, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH2, self.baseTempo*2);
      this.intervalSound(self, totalInterval - self.baseTempo, tone, RA_BASE, self.baseTempo*2);
      this.intervalSound(self, totalInterval - self.baseTempo, tone, DO_HIGH, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_HIGH, self.baseTempo*3/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo/4);
      
      // 13
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo*1.5);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo*1.5);
      this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo*1.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo*1.5);
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RES_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SOF_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RES_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SOF_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RES_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo/2);
      
      // 14
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo*3/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo/4);
      
      // 15
      this.intervalSound(self, totalInterval, tone, SOS_LOW, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, SI_LOW, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, RA_LOW, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, FAS_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, SI_LOW, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RAF_BASE, self.baseTempo);
      
      // 16
      this.intervalSound(self, totalInterval, tone, RA_LOW, self.baseTempo*4);
      this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo*4);
      this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo*4);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo*2);
      totalInterval += self.baseTempo/2;
      this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      
      // 17
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo*2.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, FAS_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, FAS_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      
      // 18
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo);
      
      // 19
      this.intervalSound(self, totalInterval, tone, SOS_BASE, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo*2.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, SOS_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SOS_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SOS_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo/2);
      
      // 20
      this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo);
      
      // 21
      this.intervalSound(self, totalInterval, tone, FAS_BASE, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo*2.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, FAS_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, FAS_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, FAS_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      
      // 22
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, SI_LOW, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo);
      
      // 23
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, DOS_HIGH, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo*2.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_HIGH, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_HIGH, self.baseTempo/2);
      
      // 24
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo*4);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo*4);
      this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo*4);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo*2);
      totalInterval += self.baseTempo/2;
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      
      // 25
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo*2);
      totalInterval += self.baseTempo;
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo*2);
      totalInterval += self.baseTempo;
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo);
      
      // 26
      this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo*2);
      
      /*
      // 1
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo*3/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo*3/4);
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/4);
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);

      // 2
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_BASE, self.baseTempo/2);

      // 3
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo*3/4);

      // 4
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo*3/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);

      // 5
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo*4);

      // 6
      totalInterval += self.baseTempo*3;
      this.intervalSound(self, totalInterval, tone, SIF_BASE, self.baseTempo*3/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo*3/4);
      this.intervalSound(self, totalInterval, tone, SIF_BASE, self.baseTempo/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/4);
        
      // 7
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, SO_HIGH, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_HIGH, self.baseTempo);
        
      // 8
      this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH2, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH2, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, DO_HIGH2, self.baseTempo*3/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_HIGH2, self.baseTempo*3/4);
      this.intervalSound(self, totalInterval, tone, SIF_HIGH, self.baseTempo/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH2, self.baseTempo/4);
        
      // 9
      this.intervalSound(self, totalInterval, tone, SIF_HIGH, self.baseTempo*1.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH2, self.baseTempo*1.5);
      this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH2, self.baseTempo/2);
      totalInterval += self.baseTempo/2;
      this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SI_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH2, self.baseTempo/2);
        
      // 10
      this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH2, self.baseTempo/2);
      totalInterval += self.baseTempo/2;
      this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo*3/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo*3/4);
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/4);
        
      // 11
      this.intervalSound(self, totalInterval, tone, REF_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, REF_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, RE_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, REF_HIGH, self.baseTempo);
        
      // 12
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo*2.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo/2);
        
      // 13
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo*2.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_HIGH, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo/2);
        
      // 14
      this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, SIF_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, MI_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo);
        
      // 15
      this.intervalSound(self, totalInterval, tone, REF_HIGH, self.baseTempo*2.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, REF_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, REF_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, REF_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_HIGH, self.baseTempo/2);
        
      // 16
      this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo);
        
      // 17
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo*2.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_HIGH, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SI_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo/2);
        
      // 18
      this.intervalSound(self, totalInterval, tone, SIF_BASE, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, SIF_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo);
      this.intervalSound(self, totalInterval, tone, SIF_BASE, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo);
        
      // 19
      this.intervalSound(self, totalInterval, tone, SOF_HIGH, self.baseTempo*2.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH2, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, SOF_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, SO_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_HIGH2, self.baseTempo/2);
        
      // 20
      this.intervalSound(self, totalInterval, tone, SIF_HIGH, self.baseTempo*2.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH2, self.baseTempo*2.5);
      this.intervalSound(self, totalInterval, tone, SIF_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, DO_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo/2);
      this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo/2);
        
      // 21
      this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_HIGH, self.baseTempo*2);
      this.intervalSound(self, totalInterval, tone, MI_HIGH, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_HIGH, self.baseTempo*2);
        
      // 22
      this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo*3);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_HIGH, self.baseTempo*3);
      */
    },
    
    startLower: function(self, totalInterval, tone) {
      // 10
      totalInterval += self.baseTempo;
      
      // 11
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo);
      
      // 12
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_LOW2, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW2, self.baseTempo*2);
      
      // 13
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo);
      
      // 14
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo);
      
      // 15
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_LOW2, self.baseTempo);
      
      // 16
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SOS_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo/2);
      
      // 17
      totalInterval = this.intervalSound(self, totalInterval, tone, FAS_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW, self.baseTempo*1.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, FAS_LOW2, self.baseTempo/2);
      
      // 18
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FAS_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo/2);
      
      // 19
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_LOW, self.baseTempo*1.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_LOW2, self.baseTempo/2);
      
      // 20
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SOS_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo/2);
      
      // 21
      totalInterval = this.intervalSound(self, totalInterval, tone, FAS_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW, self.baseTempo*1.5);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo/2);
      
      // 22
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FAS_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW, self.baseTempo/2);
      
      // 23
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DOS_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo*2);
      
      // 24
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_LOW2, self.baseTempo/2);
      
      // 25
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW3, self.baseTempo);
      
      // 26
      this.intervalSound(self, totalInterval, tone, DO_LOW2, self.baseTempo*2);
      totalInterval += self.baseTempo/2;
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_LOW2, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW2, self.baseTempo);
      
      /*
      // 1
      totalInterval += self.baseTempo*3;

      // 2
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);

      // 3
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_HIGH, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo*3/4);

      // 4
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo*3/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/4);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW, self.baseTempo/2);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_BASE, self.baseTempo/2);

      // 5
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_BASE, self.baseTempo*4);

      // 6
      totalInterval += self.baseTempo*4;

      // 7
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, MIF_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW, self.baseTempo);

      // 8
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_LOW2, self.baseTempo*2);

      // 9
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW, self.baseTempo);

      // 10
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW, self.baseTempo);

      // 11
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo*2);

      // 12
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW, self.baseTempo);

      // 13
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo);

      // 14
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo*2);

      // 15
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, REF_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo);

      // 16
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, MI_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW, self.baseTempo);

      // 17
      totalInterval = this.intervalSound(self, totalInterval, tone, SI_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo);

      // 18
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo*2);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo*2);

      // 19
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SOF_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RE_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo);

      // 20
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, RA_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_LOW2, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW2, self.baseTempo);

      // 21
      totalInterval = this.intervalSound(self, totalInterval, tone, SO_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, SIF_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo);

      // 22
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, DO_LOW, self.baseTempo);
      totalInterval = this.intervalSound(self, totalInterval, tone, FA_LOW2, self.baseTempo);
      */
    },
    
    intervalSound: function(self, totalInterval, tone, sound, length) {
      setTimeout(function() { $.proxy(self.goScound(sound, length*.95, tone), self) }, totalInterval);
      totalInterval += length;
      return totalInterval;
    },
    
    goScound: function(sound, length, tone) {
      length = length || this.baseTempo;
      output = this.outputs[0];
      output.send([0xC0, tone]);
      output.send([0x90, sound, 0x7f]);
      output.send([0x90, sound, 0x00], window.performance.now() + length);
    }
  };
  
  $.fn.musicStart = function() {
    new MusicStart($(this));
  };
})(jQuery);
